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
    public class ProductService : BaseService, IProductService
    {
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepo;
        public ProductService(IMapper mapper, IAdowayContext dbContext, IProductRepository ProductRepo) : base(dbContext)
        {
            _mapper = mapper;
            _productRepo = ProductRepo;
        }

        public async Task<ProductViewModel> Create(ProductViewModel model)
        {
            var productEntity = _mapper.Map<ProductEntity>(model);
            var entity = await _productRepo.Insert(productEntity);
            return _mapper.Map<ProductViewModel>(entity);
        }

        public async Task<ProductViewModel> Edit(ProductViewModel model)
        {
            var productEntity = await _productRepo.GetById(model.Id);
            if (productEntity != null)
            {
                productEntity.CategoryId = model.CategoryId;
                productEntity.SupplierId = model.SupplierId;
                productEntity.ProductType = model.ProductType;
                productEntity.Name = model.Name;
                productEntity.SalesPrice = model.SalesPrice;
                productEntity.MeasureUnit = model.MeasureUnit;
                productEntity.Status = model.Status;
                productEntity.Description = model.Description;
                if (model.FeaturePhotoChanged)
                    productEntity.FeaturePhoto = model.FeaturePhoto;
                var entity = await _productRepo.Update(productEntity);
                return _mapper.Map<ProductViewModel>(entity);
            }
            return null;
        }

        public async Task<List<ProductViewModel>> GetAll()
        {
            var list = await _productRepo.GetAll().ToListAsync();
            return _mapper.Map<List<ProductViewModel>>(list.ToList());
        }

        public async Task<ProductViewModel> Remove(Guid id)
        {
            var entity = await _productRepo.Delete(id);
            return _mapper.Map<ProductViewModel>(entity);
        }
        public async Task<List<ProductViewModel>> GetProducts(Guid? enterpriseId)
        {
            var products = await _productRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<ProductViewModel>>(products);
        }
        public async Task<ApiResponseViewModel<ProductViewModel>> SearchProducts(ProductFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<ProductViewModel>().FromSqlRaw("EXEC SP_SearchProducts @CategoryName, @SupplierName, @Name, @EnterpriseId, @ProductType, @CategoryId, @SupplierId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@CategoryName", model.Filter.CategoryName),
                SqlParameterHelper.AddNullableStringParameter("@SupplierName", model.Filter.SupplierName),
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@ProductType", (int?)model.Filter.ProductType),
                SqlParameterHelper.AddNullableGuid("@CategoryId", model.Filter.CategoryId),
                SqlParameterHelper.AddNullableGuid("@SupplierId", model.Filter.SupplierId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<ProductViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
