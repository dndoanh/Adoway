using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Adoway.BackEnd.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Service.UserManagement;
using AutoMapper;
using Adoway.Service.Base;
using Adoway.Common.ViewModels.Base;

namespace Adoway.BackEnd.Controllers.Base
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class EnterpriseController : ApiBaseController
    {
        private readonly IEnterpriseService _enterpriseService;
        private readonly IMapper _mapper;
        public EnterpriseController(IMapper mapper, IEnterpriseService enterpriseService)
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
        public async Task<IActionResult> DeleteEnterprise([FromBody] EnterpriseViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _enterpriseService.Remove(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
    }
}
