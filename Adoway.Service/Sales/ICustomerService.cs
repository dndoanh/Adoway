using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Sales
{
    public interface ICustomerService
    {
        Task<CustomerViewModel> Create(CustomerViewModel model);
        Task<CustomerViewModel> Edit(CustomerViewModel model);
        Task<CustomerViewModel> Remove(Guid id);
        Task<List<CustomerViewModel>> GetCustomers(Guid? enterpriseId);
        Task<ApiResponseViewModel<CustomerViewModel>> SearchCustomers(CustomerFilterViewModel model);
    }
}
