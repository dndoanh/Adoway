using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.UserManagement;

namespace Adoway.Service.UserManagement
{
    public interface IRoleService
    {
        Task<RoleViewModel> Create(RoleViewModel model);
        Task<RoleViewModel> Edit(RoleViewModel model);
        Task<RoleViewModel> Remove(RoleViewModel model);
        Task<List<RoleViewModel>> GetAll();
        Task<List<RoleViewModel>> GetRoleListByEnterprise(Guid? enterpriseId);
    }
}
