using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.System;
using Adoway.Common.ViewModels.System;

namespace Adoway.BackEnd.Controllers.System
{
    public class CategoryController : ApiBaseController
    {
        private readonly IEnterpriseService _enterpriseService;
        private readonly IMapper _mapper;
        public CategoryController(IWebHostEnvironment webHostEnvironment, IMapper mapper, IEnterpriseService enterpriseService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _enterpriseService = enterpriseService;
        }
        [HttpGet]
        public async Task<IActionResult> GetEnterpriseList()
        {
            var result = await _enterpriseService.GetAll();
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchEnterprises([FromBody] EnterpriseFilterViewModel model)
        {
            var result = await _enterpriseService.SearchEnterprises(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEnterprise([FromBody] EnterpriseViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _enterpriseService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateEnterprise([FromBody] EnterpriseViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _enterpriseService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteEnterprise(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _enterpriseService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
    }
}
