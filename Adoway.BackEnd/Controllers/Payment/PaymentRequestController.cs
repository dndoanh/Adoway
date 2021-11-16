using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Payment;
using Adoway.Common.ViewModels.Payment;

namespace Adoway.BackEnd.Controllers.Payment
{
    public class PaymentRequestController : ApiBaseController
    {
        private readonly IPaymentRequestService _paymentRequestService;
        public PaymentRequestController(IWebHostEnvironment webHostEnvironment, IPaymentRequestService paymentRequestService) : base(webHostEnvironment)
        {
            _paymentRequestService = paymentRequestService;
        }
        [HttpPost]
        public async Task<IActionResult> SearchPaymentRequests([FromBody] PaymentRequestFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _paymentRequestService.SearchPaymentRequests(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search paymentRequest");
        }
        [HttpPost]
        public async Task<IActionResult> CreatePaymentRequest([FromBody] PaymentRequestViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _paymentRequestService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create paymentRequest");
        }
        [HttpPost]
        public async Task<IActionResult> UpdatePaymentRequest([FromBody] PaymentRequestViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _paymentRequestService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update paymentRequest");
        }
        [HttpPost]
        public async Task<IActionResult> DeletePaymentRequest(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _paymentRequestService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete paymentRequest");
        }
    }
}
