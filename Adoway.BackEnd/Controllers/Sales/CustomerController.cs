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
    public class CustomerController : ApiBaseController
    {
        private readonly ICustomerService _customerService;
        public CustomerController(IWebHostEnvironment webHostEnvironment, ICustomerService customerService) : base(webHostEnvironment)
        {
            _customerService = customerService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var result = await _customerService.GetCustomers(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchCustomers([FromBody] CustomerFilterViewModel model)
        {
            var result = await _customerService.SearchCustomers(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _customerService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create customer");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateCustomer([FromBody] CustomerViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _customerService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update customer");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _customerService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete customer");
        }
    }
}
