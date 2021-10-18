using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Adoway.BackEnd.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Service.UserManagement;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using System;

namespace Adoway.BackEnd.Controllers.RoleManagement
{
    public class RoleController : ApiBaseController
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IWebHostEnvironment webHostEnvironment, IMapper mapper, IRoleService roleService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _roleService = roleService;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetRoleList()
        {
            var result = await _roleService.GetRolesByEnterprise(this.CurrentEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _roleService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create role");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateRole([FromBody] RoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _roleService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update role");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteRole(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _roleService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete role");
        }
    }
}
