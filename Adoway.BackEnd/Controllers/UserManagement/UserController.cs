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
using Microsoft.AspNetCore.Hosting;
using System.Text.RegularExpressions;
using Adoway.Common.Constants;

namespace Adoway.BackEnd.Controllers.UserManagement
{
    public class UserController : ApiBaseController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IWebHostEnvironment webHostEnvironment, IMapper mapper, IUserService userService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userService.GetByEmail(User.Identity.Name);
            if (user == null)
                return BadRequest("Could not get current user");
            // return auth user
            var obj = _mapper.Map<UserAuthViewModel>(user);
            return new ObjectResult(obj);
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var result = await _userService.GetUsersByEnterprise(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchUsers([FromBody] UserFilterViewModel model)
        {
            var result = await _userService.SearchUsers(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (!string.IsNullOrEmpty(model.AvatarUrl) && Regex.IsMatch(model.AvatarUrl, Constants.BASE64_USERS_AVATAR_PATTERN))
                {
                    model.AvatarUrl = SaveFile(model.AvatarUrl, Constants.UPLOAD_FILES_USERS_AVATAR_PATH, null);
                }
                model.EnterpriseId = model.EnterpriseId ?? CurrentEnterpriseId ?? UserEnterpriseId;
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
                if (!string.IsNullOrEmpty(model.AvatarUrl) && Regex.IsMatch(model.AvatarUrl, Constants.BASE64_USERS_AVATAR_PATTERN))
                {
                    model.AvatarUrl = SaveFile(model.AvatarUrl, Constants.UPLOAD_FILES_USERS_AVATAR_PATH, null);
                    model.AvatarChanged = true;
                }
                var result = await _userService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update user");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete user");
        }

        // User in Roles
        [HttpGet]
        public async Task<IActionResult> GetUserInRoles(string id)
        {
            var result = await _userService.GetUserInRoles(Guid.Parse(id));
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUserInRole([FromBody] UserInRoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.CreateUserInRole(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create user in role");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteUserInRole(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RemoveUserInRole(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete user in role");
        }
    }
}
