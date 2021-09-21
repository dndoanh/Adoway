using Adoway.Common.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace Adoway.BackEnd.Controllers.Base
{ 
    public abstract class ApiBaseController : ControllerBase
    {
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
    }
}
