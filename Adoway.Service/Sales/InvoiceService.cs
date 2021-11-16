
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
    public class InvoiceService : BaseService, IInvoiceService
    {
        private readonly IMapper _mapper;
        private readonly IInvoiceRepository _invoiceRepo;
        public InvoiceService(IMapper mapper, IAdowayContext dbContext, IInvoiceRepository InvoiceRepo) : base(dbContext)
        {
            _mapper = mapper;
            _invoiceRepo = InvoiceRepo;
        }

        public async Task<InvoiceViewModel> Create(InvoiceViewModel model)
        {
            var InvoiceEntity = _mapper.Map<InvoiceEntity>(model);
            var entity = await _invoiceRepo.Insert(InvoiceEntity);
            return _mapper.Map<InvoiceViewModel>(entity);
        }

        public async Task<InvoiceViewModel> Edit(InvoiceViewModel model)
        {
            var invoiceEntity = await _invoiceRepo.GetById(model.Id);
            if (invoiceEntity != null)
            {
                invoiceEntity.InvoicedDate = model.InvoicedDate;
                invoiceEntity.DueDate = model.DueDate;
                invoiceEntity.Amount = model.Amount;
                invoiceEntity.Description = model.Description;
                invoiceEntity.PaymentStatus = model.PaymentStatus;
                invoiceEntity.CustomerId = model.CustomerId;
                invoiceEntity.SupplierId = model.SupplierId;
                invoiceEntity.ProjectId = model.ProjectId;
                var entity = await _invoiceRepo.Update(invoiceEntity);
                return _mapper.Map<InvoiceViewModel>(entity);
            }
            return null;
        }
        public async Task<InvoiceViewModel> Remove(Guid id)
        {
            var entity = await _invoiceRepo.Delete(id);
            return _mapper.Map<InvoiceViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<InvoiceViewModel>> SearchInvoices(InvoiceFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<InvoiceViewModel>().FromSqlRaw("EXEC SP_SearchInvoices @InvoiceNo, @CustomerName, @SupplierName, @ProjectName, @EnterpriseId, @SupplierId,  @ProjectId, @PaymentStatus, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@InvoiceNo", model.Filter.InvoiceNo),
                SqlParameterHelper.AddNullableStringParameter("@CustomerName", model.Filter.CustomerName),
                SqlParameterHelper.AddNullableStringParameter("@SupplierName", model.Filter.SupplierName),
                SqlParameterHelper.AddNullableStringParameter("@ProjectName", model.Filter.ProjectName),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableGuid("@SupplierId", model.Filter.SupplierId),
                SqlParameterHelper.AddNullableGuid("@ProjectId", model.Filter.ProjectId),
                SqlParameterHelper.AddNullableInt("@PaymentStatus", (int?)model.Filter.PaymentStatus),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<InvoiceViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
