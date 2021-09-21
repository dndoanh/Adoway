using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Adoway.Service.UserManagement
{
    public interface IAuthService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
