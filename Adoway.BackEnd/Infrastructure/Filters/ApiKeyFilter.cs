using System.Linq;
using Adoway.Common.Constants;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;

namespace Adoway.BackEnd.Controllers.Filters
{
    public class ApiKeyFilter : IAuthorizationFilter
    {
        private readonly IConfiguration _configuration;
        public ApiKeyFilter(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue(Constants.AUTH_API_KEY, out var values))
            {
                context.Result = new UnauthorizedObjectResult("Authorization header is missing");
                return;
            }
            var secretKey = values.FirstOrDefault();
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                context.Result = new UnauthorizedObjectResult("ApiKey is empty");
                return;
            }
            if (!_configuration["ApiKey:SecretKey"].Equals(secretKey))
            {
                context.Result = new UnauthorizedObjectResult("ApiKey Unauthorized");
                return;
            }
        }
    }
}
