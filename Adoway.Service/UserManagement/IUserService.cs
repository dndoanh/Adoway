using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;

namespace Adoway.Service.UserManagement
{
    public interface IUserService
    {
        Task<UserViewModel> Create(UserViewModel model);
        Task<UserViewModel> Edit(UserViewModel model);
        Task<UserViewModel> Remove(UserViewModel model);
        Task<List<UserViewModel>> GetAll();
        Task<UserViewModel> GetByEmailPassword(string email, string password);
        Task<UserViewModel> GetByEmail(string email);
        Task<UserViewModel> GetByUserId(string id);
        Task<List<UserViewModel>> GetUserListByEnterprise(Guid? enterpriseId);
        Task<UserViewModel> UpdateRefreshToken(UserAuthViewModel model);
    }
}
