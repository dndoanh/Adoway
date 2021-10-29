using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Purchase;
using Adoway.Common.ViewModels.Purchase;

namespace Adoway.BackEnd.Controllers.Purchase
{
    public class SupplierController : ApiBaseController
    {
        private readonly ISupplierService _supplierService;
        private readonly IMapper _mapper;
        public SupplierController(IWebHostEnvironment webHostEnvironment, IMapper mapper, ISupplierService supplierService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _supplierService = supplierService;
        }
        [HttpGet]
        public async Task<IActionResult> GetSuppliers()
        {
            var result = await _supplierService.GetSuppliers(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchCategorries([FromBody] SupplierFilterViewModel model)
        {
            var result = await _supplierService.SearchSuppliers(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateSupplier([FromBody] SupplierViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _supplierService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create supplier");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateSupplier([FromBody] SupplierViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _supplierService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update supplier");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteSupplier(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _supplierService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete supplier");
        }
    }
}
