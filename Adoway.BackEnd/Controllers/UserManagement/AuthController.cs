using AutoMapper;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Common.Extensions;
using Adoway.Common.Helpers;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Service.UserManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace Adoway.BackEnd.Controllers.UserManagement
{
    public class AuthController : ApiBaseController
    {
        private readonly IMapper _mapper;
        private readonly IUserService _UserService;
        private readonly IAuthService _AuthService;
        public AuthController(IWebHostEnvironment webHostEnvironment, IMapper mapper, IUserService userService, IAuthService authService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _UserService = userService;
            _AuthService = authService;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _UserService.GetByEmailPassword(model.Email, SecurityHelper.SHA1Hash(model.Password));
                if (user != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.GivenName, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Sid, user.EnterpriseId!=null? user.EnterpriseId.ToString(): string.Empty),
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email)
                    };
                    // generate access token and refresh token
                    var accessToken = _AuthService.GenerateAccessToken(claims);
                    var refreshToken = _AuthService.GenerateRefreshToken();
                    // update refresh token in db
                    await _UserService.UpdateRefreshToken(new UserAuthViewModel { Id = user.Id, RefreshToken = refreshToken });
                    // return auth user
                    var obj = _mapper.Map<UserAuthViewModel>(user);
                    obj.AccessToken = accessToken;
                    obj.Screens = await _UserService.GetUserScreens(obj.Id);
                    obj.Functions = await _UserService.GetUserFunctions(obj.Id);
                    return new ObjectResult(obj);
                }
            }

            return BadRequest("Could not create access token");
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenViewModel model)
        {
            var principal = _AuthService.GetPrincipalFromExpiredToken(model.AccessToken);
            var user = await _UserService.GetByEmail(principal.Identity.Name);
            if (user == null || user.RefreshToken != model.RefreshToken)
                return BadRequest("Could not refresh access token");
            // generate access token and refresh token
            var accessToken = _AuthService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _AuthService.GenerateRefreshToken();
            // update refresh token in db
            await _UserService.UpdateRefreshToken(new UserAuthViewModel { Id = user.Id, RefreshToken = newRefreshToken });
            // return auth user
            var obj = _mapper.Map<UserAuthViewModel>(user);
            obj.AccessToken = accessToken;
            return new ObjectResult(obj);
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> SwitchEnterprise(string enterpriseId)
        {
            var user = await _UserService.GetByEmail(this.User.Identity.Name);
            if (user == null)
                return BadRequest("Could not refresh access token");
            var claims = this.User.Claims.ToList();
            var entityIdClaim = claims?.FirstOrDefault(x => x.Type.Equals(JwtRegisteredClaimNames.Jti, StringComparison.OrdinalIgnoreCase));
            if (entityIdClaim != null)
            {
                claims.Remove(entityIdClaim);
            }
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, enterpriseId.IsNullOrEmpty() ? string.Empty : enterpriseId));
            // generate access token and refresh token
            var accessToken = _AuthService.GenerateAccessToken(claims);
            var newRefreshToken = _AuthService.GenerateRefreshToken();
            // update refresh token in db
            await _UserService.UpdateRefreshToken(new UserAuthViewModel { Id = user.Id, RefreshToken = newRefreshToken });
            // return auth user
            var obj = _mapper.Map<UserAuthViewModel>(user);
            obj.AccessToken = accessToken;
            return new ObjectResult(obj);
        }
    }
}
