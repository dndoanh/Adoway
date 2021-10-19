using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.UserManagement;

namespace Adoway.Service.UserManagement
{
    public interface IRoleService
    {
        Task<RoleViewModel> Create(RoleViewModel model);
        Task<RoleViewModel> Edit(RoleViewModel model);
        Task<RoleViewModel> Remove(Guid id);
        Task<List<RoleViewModel>> GetRolesByEnterprise(Guid? enterpriseId);
        Task<ApiResponseViewModel<RoleViewModel>> SearchRoles(RoleFilterViewModel model);
        Task<List<RoleInScreenViewModel>> GetRoleInScreens(Guid roleId);
        Task<List<RoleInScreenViewModel>> EditRoleInScreens(List<RoleInScreenViewModel> model);
    }
}
