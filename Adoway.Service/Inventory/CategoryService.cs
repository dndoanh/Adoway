using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Inventory;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Repositories.Inventory;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.Inventory
{
    public class CategoryService : BaseService, ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepo;
        public CategoryService(IMapper mapper, IAdowayContext dbContext, ICategoryRepository CategoryRepo) : base(dbContext)
        {
            _mapper = mapper;
            _categoryRepo = CategoryRepo;
        }
        public async Task<CategoryViewModel> Create(CategoryViewModel model)
        {
            var CategoryEntity = _mapper.Map<CategoryEntity>(model);
            var entity = await _categoryRepo.Insert(CategoryEntity);
            return _mapper.Map<CategoryViewModel>(entity);
        }

        public async Task<CategoryViewModel> Edit(CategoryViewModel model)
        {
            var categoryEntity = await _categoryRepo.GetById(model.Id);
            if (categoryEntity != null)
            {
                categoryEntity.Name = model.Name;
                categoryEntity.ParentId = model.ParentId;
                categoryEntity.Description = model.Description;
                var entity = await _categoryRepo.Update(categoryEntity);
                return _mapper.Map<CategoryViewModel>(entity);
            }
            return null;
        }
        public async Task<CategoryViewModel> Remove(Guid id)
        {
            var entity = await _categoryRepo.Delete(id);
            return _mapper.Map<CategoryViewModel>(entity);
        }
        public async Task<List<CategoryViewModel>> GetCategories(Guid? enterpriseId)
        {
            var categories = await _categoryRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<CategoryViewModel>>(categories);
        }
        public async Task<ApiResponseViewModel<CategoryViewModel>> SearchCategories(CategoryFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<CategoryViewModel>().FromSqlRaw("EXEC SP_SearchCategories @ParentName, @Name, @Description, @EnterpriseId, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@ParentName", model.Filter.ParentName),
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Description", model.Filter.Description),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<CategoryViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
