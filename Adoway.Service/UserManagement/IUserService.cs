using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;

namespace Adoway.Service.UserManagement
{
    public interface IUserService
    {
        Task<UserViewModel> Create(UserViewModel model);
        Task<UserViewModel> Edit(UserViewModel model);
        Task<UserViewModel> UpdateRefreshToken(UserAuthViewModel model);
        Task<UserViewModel> Remove(Guid id);
        Task<UserViewModel> GetByEmailPassword(string email, string password);
        Task<UserViewModel> GetByEmail(string email);
        Task<UserViewModel> GetByUserId(string id);
        Task<List<UserViewModel>> GetUsersByEnterprise(Guid? enterpriseId);
        Task<ApiResponseViewModel<UserViewModel>> SearchUsers(UserFilterViewModel model);
    }
}
