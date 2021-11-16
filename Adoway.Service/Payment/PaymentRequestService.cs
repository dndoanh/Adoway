using System;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;
using Adoway.Data.Repositories.Payment;
using Adoway.Common.ViewModels.Payment;
using Adoway.Data.Entities.Payment;

namespace Adoway.Service.Payment
{
    public class PaymentRequestService : BaseService, IPaymentRequestService
    {
        private readonly IMapper _mapper;
        private readonly IPaymentRequestRepository _paymentRequestRepo;
        public PaymentRequestService(IMapper mapper, IAdowayContext dbContext, IPaymentRequestRepository PaymentRequestRepo) : base(dbContext)
        {
            _mapper = mapper;
            _paymentRequestRepo = PaymentRequestRepo;
        }

        public async Task<PaymentRequestViewModel> Create(PaymentRequestViewModel model)
        {
            var paymentRequestEntity = _mapper.Map<PaymentRequestEntity>(model);
            var entity = await _paymentRequestRepo.Insert(paymentRequestEntity);
            return _mapper.Map<PaymentRequestViewModel>(entity);
        }

        public async Task<PaymentRequestViewModel> Edit(PaymentRequestViewModel model)
        {
            var paymentRequestEntity = await _paymentRequestRepo.GetById(model.Id);
            if (paymentRequestEntity != null)
            {
                paymentRequestEntity.DueDate = model.DueDate;
                paymentRequestEntity.DepositAmount = model.DepositAmount;
                paymentRequestEntity.Amount = model.Amount;
                paymentRequestEntity.Description = model.Description;
                paymentRequestEntity.Notes = model.Notes;
                paymentRequestEntity.PaymentMethod = model.PaymentMethod;
                paymentRequestEntity.ProjectId = model.ProjectId;
                paymentRequestEntity.CustomerId = model.CustomerId;
                paymentRequestEntity.ProjectId = model.ProjectId;
                var entity = await _paymentRequestRepo.Update(paymentRequestEntity);
                return _mapper.Map<PaymentRequestViewModel>(entity);
            }
            return null;
        }
        public async Task<PaymentRequestViewModel> Remove(Guid id)
        {
            var entity = await _paymentRequestRepo.Delete(id);
            return _mapper.Map<PaymentRequestViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<PaymentRequestViewModel>> SearchPaymentRequests(PaymentRequestFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<PaymentRequestViewModel>().FromSqlRaw("EXEC SP_SearchPaymentRequests @RequestNo, @RequesterName, @CustomerName, @ProjectName, @EnterpriseId, @ProjectId, @PaymentMethod, @PaymentRequestStatus, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@RequestNo", model.Filter.RequestNo),
                SqlParameterHelper.AddNullableStringParameter("@RequesterName", model.Filter.RequesterName),
                SqlParameterHelper.AddNullableStringParameter("@CustomerName", model.Filter.CustomerName),
                SqlParameterHelper.AddNullableStringParameter("@ProjectName", model.Filter.ProjectName),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableGuid("@ProjectId", model.Filter.ProjectId),
                SqlParameterHelper.AddNullableInt("@PaymentMethod", (int?)model.Filter.PaymentMethod),
                SqlParameterHelper.AddNullableInt("@PaymentRequestStatus", (int?)model.Filter.PaymentRequestStatus),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<PaymentRequestViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
