using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;

namespace Adoway.Service.Base
{
    public interface IEnterpriseService
    {
        Task<EnterpriseViewModel> Create(EnterpriseViewModel model);
        Task<EnterpriseViewModel> Edit(EnterpriseViewModel model);
        Task<EnterpriseViewModel> Remove(EnterpriseViewModel model);
        Task<List<EnterpriseViewModel>> GetAll();
    }
}
