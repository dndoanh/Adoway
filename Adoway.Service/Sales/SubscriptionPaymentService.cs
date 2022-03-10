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
using Adoway.Common.Helpers;

namespace Adoway.Service.Sales
{
    public class SubscriptionPaymentService : BaseService, ISubscriptionPaymentService
    {
        private readonly IMapper _mapper;
        private readonly ISubscriptionPaymentRepository _subsRepo;
        public SubscriptionPaymentService(IMapper mapper, IAdowayContext dbContext, ISubscriptionPaymentRepository SubscriptionRepo) : base(dbContext)
        {
            _mapper = mapper;
            _subsRepo = SubscriptionRepo;
        }

        public async Task<SubscriptionPaymentImportViewModel> Create(SubscriptionPaymentImportViewModel model)
        {
            var subsEntity = _mapper.Map<SubscriptionPaymentEntity>(model);
            var entity = await _subsRepo.Insert(subsEntity);
            return _mapper.Map<SubscriptionPaymentImportViewModel>(entity);
        }

        public async Task<SubscriptionPaymentImportViewModel> Edit(SubscriptionPaymentImportViewModel model)
        {

            var subsEntity = await _subsRepo.GetById(model.Id);
            if (subsEntity != null)
            {
                subsEntity.SubscriptionId = model.SubscriptionId;
                subsEntity.Amount = model.Amount;
                subsEntity.PaymentDate = model.PaymentDate;
                subsEntity.Description = model.Description;
                var entity = await _subsRepo.Update(subsEntity);
                return _mapper.Map<SubscriptionPaymentImportViewModel>(entity);
            }
            return null;
        }

        public async Task<SubscriptionPaymentViewModel> Remove(Guid id)
        {
            var entity = await _subsRepo.Delete(id);
            return _mapper.Map<SubscriptionPaymentViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<SubscriptionPaymentViewModel>> SearchSubscriptions(SubscriptionPaymentFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            return null;
        }
        public async Task<SubscriptionPaymentViewModel> FindSubPayments(Guid SubsId, DateTime PaymentDate)
        {
            var entity = await _subsRepo.SingleBy(u => u.SubscriptionId == SubsId && u.PaymentDate == PaymentDate);
            return _mapper.Map<SubscriptionPaymentViewModel>(entity); ;
        }

        public async Task<List<SubscriptionPaymentViewModel>> SearchSubPayments(List<SubscriptionViewModel> model)
        {
            var result = new List<SubscriptionPaymentViewModel>();

            foreach (var item in model)
            {
                var SubPaymentItems=await _subsRepo.FindByAsync(u => u.SubscriptionId == item.Id);
                var temp = new SubscriptionPaymentViewModel { 
                    ContractCode=item.ContractCode,
                    SubscriptionId=item.Id,
                };
                foreach (var SubPaymentItem in SubPaymentItems)
                {
                    var propertyInfo = temp.GetType().GetProperty(SubPaymentItem.PaymentDate.MonthToString());
                    propertyInfo.SetValue(temp, SubPaymentItem.Amount, null);
                }
                result.Add(temp);
            }
            return result;
        }
    }
}
