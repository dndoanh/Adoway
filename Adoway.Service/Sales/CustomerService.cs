
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Sales;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Sales;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.Sales
{
    public class CustomerService : BaseService, ICustomerService
    {
        private readonly IMapper _mapper;
        private readonly ICustomerRepository _customerRepo;
        public CustomerService(IMapper mapper, IAdowayContext dbContext, ICustomerRepository CustomerRepo) : base(dbContext)
        {
            _mapper = mapper;
            _customerRepo = CustomerRepo;
        }

        public async Task<CustomerViewModel> Create(CustomerViewModel model)
        {
            var CustomerEntity = _mapper.Map<CustomerEntity>(model);
            var entity = await _customerRepo.Insert(CustomerEntity);
            return _mapper.Map<CustomerViewModel>(entity);
        }

        public async Task<CustomerViewModel> Edit(CustomerViewModel model)
        {
            var customerEntity = await _customerRepo.GetById(model.Id);
            if (customerEntity != null)
            {
                customerEntity.CustomerType = model.CustomerType;
                customerEntity.Name = model.Name;
                customerEntity.Phone = model.Phone;
                customerEntity.Email = model.Email;
                customerEntity.Address = model.Address;
                customerEntity.Status = model.Status;
                var entity = await _customerRepo.Update(customerEntity);
                return _mapper.Map<CustomerViewModel>(entity);
            }
            return null;
        }
        public async Task<CustomerViewModel> Remove(Guid id)
        {
            var entity = await _customerRepo.Delete(id);
            return _mapper.Map<CustomerViewModel>(entity);
        }
        public async Task<List<CustomerViewModel>> GetCustomers(Guid? enterpriseId)
        {
            var Customers = await _customerRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<CustomerViewModel>>(Customers);
        }
        public async Task<ApiResponseViewModel<CustomerViewModel>> SearchCustomers(CustomerFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<CustomerViewModel>().FromSqlRaw("EXEC SP_SearchCustomers @Name, @Phone, @Email, @Address, @EnterpriseId, @CustomerType, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Phone", model.Filter.Phone),
                SqlParameterHelper.AddNullableStringParameter("@Email", model.Filter.Email),
                SqlParameterHelper.AddNullableStringParameter("@Address", model.Filter.Address),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@CustomerType", (int?)model.Filter.CustomerType),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<CustomerViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
