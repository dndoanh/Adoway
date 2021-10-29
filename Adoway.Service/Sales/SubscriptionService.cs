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
    public class SubscriptionService : BaseService, ISubscriptionService
    {
        private readonly IMapper _mapper;
        private readonly ISubscriptionRepository _subsRepo;
        public SubscriptionService(IMapper mapper, IAdowayContext dbContext, ISubscriptionRepository SubscriptionRepo) : base(dbContext)
        {
            _mapper = mapper;
            _subsRepo = SubscriptionRepo;
        }

        public async Task<SubscriptionViewModel> Create(SubscriptionViewModel model)
        {
            var subsEntity = _mapper.Map<SubscriptionEntity>(model);
            var entity = await _subsRepo.Insert(subsEntity);
            return _mapper.Map<SubscriptionViewModel>(entity);
        }

        public async Task<SubscriptionViewModel> Edit(SubscriptionViewModel model)
        {
            var subsEntity = await _subsRepo.GetById(model.Id);
            if (subsEntity != null)
            {
                subsEntity.ContractCode = model.ContractCode;
                subsEntity.CustomerCode = model.CustomerCode;
                subsEntity.EndDate = model.EndDate;
                subsEntity.Description = model.Description;
                subsEntity.SubscriptionPeriod = model.SubscriptionPeriod;
                subsEntity.Status = model.Status;
                var entity = await _subsRepo.Update(subsEntity);
                return _mapper.Map<SubscriptionViewModel>(entity);
            }
            return null;
        }
        public async Task<SubscriptionViewModel> Remove(Guid id)
        {
            var entity = await _subsRepo.Delete(id);
            return _mapper.Map<SubscriptionViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<SubscriptionViewModel>> SearchSubscriptions(SubscriptionFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<SubscriptionViewModel>().FromSqlRaw("EXEC SP_SearchSubscriptions @ContractCode, @CustomerCode, @CustomerName, @ApartmentName, @EnterpriseId, @ProjectId, @ProductId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@ContractCode", model.Filter.ContractCode),
                SqlParameterHelper.AddNullableStringParameter("@CustomerCode", model.Filter.CustomerCode),
                SqlParameterHelper.AddNullableStringParameter("@CustomerName", model.Filter.CustomerName),
                SqlParameterHelper.AddNullableStringParameter("@ApartmentName", model.Filter.ApartmentName),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableGuid("@ProjectId", model.Filter.ProjectId),
                SqlParameterHelper.AddNullableGuid("@ProductId", model.Filter.ProductId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<SubscriptionViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
