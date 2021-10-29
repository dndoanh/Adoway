using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Project;

namespace Adoway.Service.Project
{
    public interface IOwnerService
    {
        Task<OwnerViewModel> Create(OwnerViewModel model);
        Task<OwnerViewModel> Edit(OwnerViewModel model);
        Task<OwnerViewModel> Remove(Guid id);
        Task<List<OwnerViewModel>> GetOwners(Guid? enterpriseId);
        Task<ApiResponseViewModel<OwnerViewModel>> SearchOwners(OwnerFilterViewModel model);
    }
}
