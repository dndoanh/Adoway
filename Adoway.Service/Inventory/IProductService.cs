using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Inventory;

namespace Adoway.Service.Inventory
{
    public interface IProductService
    {
        Task<ProductViewModel> Create(ProductViewModel model);
        Task<ProductViewModel> Edit(ProductViewModel model);
        Task<ProductViewModel> Remove(Guid id);
        Task<List<ProductViewModel>> GetProducts(Guid? enterpriseId);
        Task<ApiResponseViewModel<ProductViewModel>> SearchProducts(ProductFilterViewModel model);
    }
}
