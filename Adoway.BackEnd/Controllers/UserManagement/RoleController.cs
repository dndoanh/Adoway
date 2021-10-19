using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Adoway.BackEnd.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Service.UserManagement;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;

namespace Adoway.BackEnd.Controllers.RoleManagement
{
    public class RoleController : ApiBaseController
    {
        private readonly IRoleService _roleService;
        public RoleController(IWebHostEnvironment webHostEnvironment, IRoleService roleService) : base(webHostEnvironment)
        {
            _roleService = roleService;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var result = await _roleService.GetRolesByEnterprise(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchRoles([FromBody] RoleFilterViewModel model)
        {
            var result = await _roleService.SearchRoles(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] RoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.EnterpriseId = model.EnterpriseId ?? CurrentEnterpriseId ?? UserEnterpriseId;
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

        // Role in Screen's Functions
        [HttpGet]
        public async Task<IActionResult> GetRoleInScreens(string id)
        {
            var result = await _roleService.GetRoleInScreens(Guid.Parse(id));
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> UpdateRoleInScreens([FromBody] List<RoleInScreenViewModel> model)
        {
            var result = await _roleService.EditRoleInScreens(model);
            return new ObjectResult(result);
        }
    }
}
