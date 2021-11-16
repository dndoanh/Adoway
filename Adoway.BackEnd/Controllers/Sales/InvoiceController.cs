using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Sales;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.BackEnd.Controllers.Sales
{
    public class InvoiceController : ApiBaseController
    {
        private readonly IInvoiceService _invoiceService;
        public InvoiceController(IWebHostEnvironment webHostEnvironment, IInvoiceService invoiceService) : base(webHostEnvironment)
        {
            _invoiceService = invoiceService;
        }
        [HttpPost]
        public async Task<IActionResult> SearchInvoices([FromBody] InvoiceFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _invoiceService.SearchInvoices(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search invoice");
        }
        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromBody] InvoiceViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _invoiceService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create invoice");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateInvoice([FromBody] InvoiceViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _invoiceService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update invoice");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteInvoice(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _invoiceService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete invoice");
        }
    }
}
