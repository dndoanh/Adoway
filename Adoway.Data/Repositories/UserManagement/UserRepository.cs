using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.UserManagement;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.UserManagement
{
    public class UserRepository : Repository<UserEntity>, IUserRepository
    {
        public UserRepository(ILogger<UserRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
