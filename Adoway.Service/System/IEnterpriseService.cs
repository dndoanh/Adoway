using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;

namespace Adoway.Service.System
{
    public interface IEnterpriseService
    {
        Task<EnterpriseViewModel> Create(EnterpriseViewModel model);
        Task<EnterpriseViewModel> Edit(EnterpriseViewModel model);
        Task<EnterpriseViewModel> Remove(Guid id);
        Task<List<EnterpriseViewModel>> GetAll();
        Task<ApiResponseViewModel<EnterpriseViewModel>> SearchEnterprises(EnterpriseFilterViewModel model);
    }
}
