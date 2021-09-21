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

namespace Adoway.BackEnd.Controllers.UserManagement
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class UserController : ApiBaseController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userService.GetByEmail(this.User.Identity.Name);
            if (user == null)
                return BadRequest("Could not get current user");
            // return auth user
            var obj = _mapper.Map<UserAuthViewModel>(user);
            return new ObjectResult(obj);
        }
        [HttpGet]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetByUserId(id);
            if (user == null)
                return BadRequest("Could not get current user");
            // return auth user
            var obj = _mapper.Map<UserAuthViewModel>(user);
            return new ObjectResult(obj);
        }
        [HttpGet]
        public async Task<IActionResult> GetUserList()
        {
            var result = await _userService.GetUserListByEnterprise(this.UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create user");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateUser([FromBody] UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update user");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteUser([FromBody] UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.Remove(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete user");
        }
    }
}
