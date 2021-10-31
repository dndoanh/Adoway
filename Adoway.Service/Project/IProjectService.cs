using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Project;

namespace Adoway.Service.Project
{
    public interface IProjectService
    {
        Task<ProjectViewModel> Create(ProjectViewModel model);
        Task<ProjectViewModel> Edit(ProjectViewModel model);
        Task<ProjectViewModel> Remove(Guid id);
        Task<List<ProjectViewModel>> GetProjects(Guid? enterpriseId);
        Task<ApiResponseViewModel<ProjectViewModel>> SearchProjects(ProjectFilterViewModel model);
    }
}
