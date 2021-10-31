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
    public class SubscriptionController : ApiBaseController
    {
        private readonly ISubscriptionService _subscriptionService;
        public SubscriptionController(IWebHostEnvironment webHostEnvironment, ISubscriptionService subscriptionService) : base(webHostEnvironment)
        {
            _subscriptionService = subscriptionService;
        }
        [HttpPost]
        public async Task<IActionResult> SearchSubscriptions([FromBody] SubscriptionFilterViewModel model)
        {
            var result = await _subscriptionService.SearchSubscriptions(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] SubscriptionViewModel model)
        {
            if (ModelState.IsValid)
            {
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
    }
}
