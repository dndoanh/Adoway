using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Inventory;

namespace Adoway.Service.Inventory
{
    public interface ICategoryService
    {
        Task<CategoryViewModel> Create(CategoryViewModel model);
        Task<CategoryViewModel> Edit(CategoryViewModel model);
        Task<CategoryViewModel> Remove(Guid id);
        Task<List<CategoryViewModel>> GetCategories(Guid? enterpriseId);
        Task<ApiResponseViewModel<CategoryViewModel>> SearchCategories(CategoryFilterViewModel model);
    }
}
