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
    public class CategoryController : ApiBaseController
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(IWebHostEnvironment webHostEnvironment, ICategoryService categoryService) : base(webHostEnvironment)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _categoryService.GetCategories(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchCategories([FromBody] CategoryFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _categoryService.SearchCategories(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search category");
        }
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryViewModel model)
        {
            if(ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _categoryService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create category");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateCategory([FromBody] CategoryViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _categoryService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update category");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _categoryService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete category");
        }
    }
}
