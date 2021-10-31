using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Purchase;
using Adoway.Data.Entities.Purchase;
using Adoway.Data.Repositories.Purchase;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.Purchase
{
    public class SupplierService : BaseService, ISupplierService
    {
        private readonly IMapper _mapper;
        private readonly ISupplierRepository _supplierRepo;
        public SupplierService(IMapper mapper, IAdowayContext dbContext, ISupplierRepository SupplierRepo) : base(dbContext)
        {
            _mapper = mapper;
            _supplierRepo = SupplierRepo;
        }

        public async Task<SupplierViewModel> Create(SupplierViewModel model)
        {
            var SupplierEntity = _mapper.Map<SupplierEntity>(model);
            var entity = await _supplierRepo.Insert(SupplierEntity);
            return _mapper.Map<SupplierViewModel>(entity);
        }

        public async Task<SupplierViewModel> Edit(SupplierViewModel model)
        {
            var supplierEntity = await _supplierRepo.GetById(model.Id);
            if (supplierEntity != null)
            {
                supplierEntity.Name = model.Name;
                supplierEntity.Address = model.Address;
                supplierEntity.ContactName = model.ContactName;
                supplierEntity.ContactPhone = model.ContactPhone;
                supplierEntity.ContactEmail = model.ContactEmail;
                supplierEntity.Status = model.Status;
                var entity = await _supplierRepo.Update(supplierEntity);
                return _mapper.Map<SupplierViewModel>(entity);
            }
            return null;
        }
        public async Task<SupplierViewModel> Remove(Guid id)
        {
            var entity = await _supplierRepo.Delete(id);
            return _mapper.Map<SupplierViewModel>(entity);
        }
        public async Task<List<SupplierViewModel>> GetSuppliers(Guid? enterpriseId)
        {
            var suppliers = await _supplierRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<SupplierViewModel>>(suppliers);
        }
        public async Task<ApiResponseViewModel<SupplierViewModel>> SearchSuppliers(SupplierFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<SupplierViewModel>().FromSqlRaw("EXEC SP_SearchSuppliers @Name, @Address, @ContactName, @ContactPhone, @ContactEmail, @EnterpriseId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Address", model.Filter.Address),
                SqlParameterHelper.AddNullableStringParameter("@ContactName", model.Filter.ContactName),
                SqlParameterHelper.AddNullableStringParameter("@ContactPhone", model.Filter.ContactPhone),
                SqlParameterHelper.AddNullableStringParameter("@ContactEmail", model.Filter.ContactEmail),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<SupplierViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
