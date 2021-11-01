using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Inventory;
using Adoway.Common.ViewModels.Inventory;

namespace Adoway.BackEnd.Controllers.Inventory
{
    public class SupplierController : ApiBaseController
    {
        private readonly IProductService _productService;
        public SupplierController(IWebHostEnvironment webHostEnvironment, IProductService productService) : base(webHostEnvironment)
        {
            _productService = productService;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var result = await _productService.GetProducts(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchProducts([FromBody] ProductFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _productService.SearchProducts(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search product");
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _productService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create product");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _productService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update product");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _productService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete product");
        }
    }
}
