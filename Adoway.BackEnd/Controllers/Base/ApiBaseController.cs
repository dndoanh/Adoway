using Adoway.Common.Constants;
using Adoway.Common.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using io = System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Adoway.BackEnd.Controllers.Base
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public abstract class ApiBaseController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ApiBaseController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public Guid? UserId
        {
            get
            {
                var claims = this.User.Claims.ToList();
                var userId = claims?.FirstOrDefault(x => x.Type.Contains("givenname", StringComparison.OrdinalIgnoreCase))?.Value;
                    if(!userId.IsNullOrEmpty())
                {
                    return Guid.Parse(userId);
                }
                return null;
            }
        }
        public Guid? UserEnterpriseId
        {
            get
            {
                var claims = this.User.Claims.ToList();
                var enterpriseId = claims?.FirstOrDefault(x => x.Type.Contains(JwtRegisteredClaimNames.Sid, StringComparison.OrdinalIgnoreCase))?.Value;
                if (!enterpriseId.IsNullOrEmpty())
                {
                    return Guid.Parse(enterpriseId);
                }
                return null;
            }
        }
        public Guid? CurrentEnterpriseId
        {
            get
            {
                var claims = this.User.Claims.ToList();
                var enterpriseId = claims?.FirstOrDefault(x => x.Type.Contains(JwtRegisteredClaimNames.Jti, StringComparison.OrdinalIgnoreCase))?.Value;
                if (!enterpriseId.IsNullOrEmpty())
                {
                    return Guid.Parse(enterpriseId);
                }
                return null;
            }
        }
        protected string SaveFile(string base64, string folderPath, string nameFile = "")
        {
            base64 = Regex.Replace(base64, Constants.BASE64_USERS_AVATAR_PATTERN, "");
            var folderFullPath = io.Path.Combine(_webHostEnvironment.WebRootPath, folderPath);
            if (!io.Directory.Exists(folderFullPath))
            {
                io.Directory.CreateDirectory(folderFullPath);
            }
            if (string.IsNullOrEmpty(nameFile))
                nameFile = DateTime.Now.Ticks.ToString();
            var fullPathSave = $"{folderFullPath}/{nameFile}.jpeg";
            var count = 1;
            while (io.File.Exists(fullPathSave))
            {
                fullPathSave = $"{folderFullPath}/{nameFile}-{count}.jpeg";
                count++;
            }
            io.File.WriteAllBytes(fullPathSave, Convert.FromBase64String(base64));
            var ressult = fullPathSave.Replace(folderFullPath, folderPath).Replace("\\", "/").Replace("//", "/");
            return ressult;
        }
    }
}
