using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.UserManagement;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.UserManagement
{
    public class UserInRoleRepository : Repository<UserInRoleEntity>, IUserInRoleRepository
    {
        public UserInRoleRepository(ILogger<UserInRoleRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
