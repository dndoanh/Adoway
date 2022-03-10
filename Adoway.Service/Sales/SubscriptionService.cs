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

        public async Task<List<SubscriptionViewModel>> Import(SubscriptionImportViewModel model,string Supplier)
        {
            var stream = StringExtensions.GenerateStreamFromString(model.FileUrl);
            var errormessage = "";
            var result = new List<SubscriptionViewModel>();
            switch (Supplier)
            {
                case "VNPT":
                     result = ExcelHelper.ExcelImportVNPT<SubscriptionViewModel>(stream, ref errormessage);
                    break;
                case "Viettel":
                    result = ExcelHelper.ExcelImportViettel<SubscriptionViewModel>(stream, ref errormessage);
                    break;
                case "CMC":
                    result = ExcelHelper.ExcelImportCMC<SubscriptionViewModel>(stream, ref errormessage);
                    break;
                case "FPT":
                    result = ExcelHelper.ExcelImportFPT<SubscriptionViewModel>(stream, ref errormessage);
                    break;
                default:
                    break;
            }
          

           return result;
        }
        public async Task<byte[]> Export(SubscriptionExportViewModel model,string path)
        {

            byte[] result = null;

            result = ExcelHelper.ExcelExport(path, null);
            return result;
        }

        public async Task<SubscriptionViewModel> FindByContractCode(string ContractCode)
        {
            var entity = await _subsRepo.SingleBy(u=>u.ContractCode== ContractCode);
            return _mapper.Map<SubscriptionViewModel>(entity);
        }
        public async Task<List<SubscriptionViewModel>> FindSubs(SubscriptionExportViewModel model)
        {
            var StartDate = new DateTime(model.Year, 1, 1,0,0,0);
            var EndDate = new DateTime(model.Year+1, 1, 1, 0, 0, 0);
            var entity = await _subsRepo.FindByAsync(u => u.SupplierId==model.SupplierId && u.ProjectId==model.ProjectId
                && u.StartDate>= StartDate && u.StartDate < EndDate
            );
            return _mapper.Map<List<SubscriptionViewModel>>(entity);
        }

        public async Task<byte[]> Export(List<SubscriptionPaymentViewModel> model, string path)
        {
            var result=  ExcelHelper.ExcelExport(path, model);
            return result;
        }
    }
}
