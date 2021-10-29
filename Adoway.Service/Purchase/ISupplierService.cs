using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Purchase;

namespace Adoway.Service.Purchase
{
    public interface ISupplierService
    {
        Task<SupplierViewModel> Create(SupplierViewModel model);
        Task<SupplierViewModel> Edit(SupplierViewModel model);
        Task<SupplierViewModel> Remove(Guid id);
        Task<List<SupplierViewModel>> GetSuppliers(Guid? enterpriseId);
        Task<ApiResponseViewModel<SupplierViewModel>> SearchSuppliers(SupplierFilterViewModel model);
    }
}
