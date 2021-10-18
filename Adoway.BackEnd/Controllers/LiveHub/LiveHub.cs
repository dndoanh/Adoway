using Adoway.Common.Extensions;
using Adoway.Service.UserManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Adoway.BackEnd.Controllers.LiveHub
{
    [Authorize]
    public class LiveHub : Hub
    {
        private readonly IUserService _userService;
        public LiveHub(IUserService userService)
        {
            _userService = userService;
        }
        public Guid? UserId
        {
            get
            {
                var claims = Context.User.Claims.ToList();
                var userId = claims?.FirstOrDefault(x => x.Type.Contains("givenname", StringComparison.OrdinalIgnoreCase))?.Value;
                if (!userId.IsNullOrEmpty())
                {
                    return Guid.Parse(userId);
                }
                return null;
            }
        }
        public override async Task OnConnectedAsync()
        {
            if (UserId.HasValue)
            {
                //await _userService.UpdateUserOnline(UserId.Value, Context.ConnectionId, true);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (UserId.HasValue)
            {
                //await _userService.UpdateUserOnline(UserId.Value, Context.ConnectionId, false);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            var user = Context.User;
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
