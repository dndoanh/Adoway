using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Project;

namespace Adoway.Service.Project
{
    public interface IApartmentService
    {
        Task<ApartmentViewModel> Create(ApartmentViewModel model);
        Task<ApartmentViewModel> Edit(ApartmentViewModel model);
        Task<ApartmentViewModel> Remove(Guid id);
        Task<List<ApartmentViewModel>> GetApartments(Guid? enterpriseId, Guid? projectId);
        Task<ApiResponseViewModel<ApartmentViewModel>> SearchApartments(ApartmentFilterViewModel model);
    }
}
