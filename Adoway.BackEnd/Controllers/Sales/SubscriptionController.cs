using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Sales;
using Adoway.Common.ViewModels.Sales;
using System.Reflection;
using Adoway.Common.Extensions;
using Adoway.Data.Entities.Sales;
using System.IO;

namespace Adoway.BackEnd.Controllers.Sales
{
    public class SubscriptionController : ApiBaseController
    {
        private readonly ISubscriptionService _subscriptionService;
        private readonly ISubscriptionPaymentService _subscriptionPaymentService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public SubscriptionController(IWebHostEnvironment webHostEnvironment, ISubscriptionService subscriptionService, ISubscriptionPaymentService subscriptionPaymentService) : base(webHostEnvironment)
        {
            _subscriptionService = subscriptionService;
            _subscriptionPaymentService = subscriptionPaymentService;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpPost]
        public async Task<IActionResult> SearchSubscriptions([FromBody] SubscriptionFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _subscriptionService.SearchSubscriptions(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search subscription");
        }
        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] SubscriptionViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _subscriptionService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create subscription");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateSubscription([FromBody] SubscriptionViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _subscriptionService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update subscription");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteSubscription(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _subscriptionService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete subscription");
        }
        [HttpPost]
        public async Task<IActionResult> ImportSubscription([FromBody] SubscriptionImportViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
            
                var result = await _subscriptionService.Import(model, model.SupplierName);
                try
                {
                    foreach (var item in result)
                    {
                        item.ProjectId = model.ProjectId;
                        item.SupplierId = model.SupplierId;
                        item.CustomerId = null;
                        item.ProductId = null;
                        item.ApartmentId = null;
                        var existedSubs = await _subscriptionService.FindByContractCode(item.ContractCode);
                        if (existedSubs == null)
                        {
                            existedSubs = await _subscriptionService.Create(item);
                        }
                       
                        var newSubsPaymentModel = new SubscriptionPaymentImportViewModel { 
                            SubscriptionId= existedSubs.Id,
                            Amount=item.SalesPrice,
                            PaymentDate=item.StartDate
                        };
                        var existedSubPayments = await _subscriptionPaymentService.FindSubPayments(item.Id, item.StartDate);
                        if (existedSubPayments == null)
                        {
                            var newSubsPayment = await _subscriptionPaymentService.Create(newSubsPaymentModel);
                        }
                        else
                        {
                            var newSubsPayment = await _subscriptionPaymentService.Edit(newSubsPaymentModel);
                        }
                        
                    }
                }
                catch (Exception ex)
                {

                    var exc = "";
                }
             
                return new ObjectResult(result);
            }
            return BadRequest("Could not create subscription");
        }

        [HttpPost]
        public async Task<IActionResult> ExportSubscription([FromBody] SubscriptionExportViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                string contentRootPath = _webHostEnvironment.ContentRootPath;
                var searchSubs = await _subscriptionService.FindSubs(model);
                var searchSubPayments = await _subscriptionPaymentService.SearchSubPayments(searchSubs);
                var strTemplateFileName = Path.Combine(contentRootPath, "Template", "ExportTemplate.xlsx");
                var result =  await _subscriptionService.Export(searchSubPayments, strTemplateFileName);
                var response= File(result, "application/ms-excel", "baocaodoisoat.xlsx");
                return response;
            }
            return BadRequest("Could not create subscription"); ;
        }
    }

}
