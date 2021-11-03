using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Project;
using Adoway.Data.Entities.Project;
using Adoway.Data.Repositories.Project;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.Project
{
    public class WorkOrderService : BaseService, IWorkOrderService
    {
        private readonly IMapper _mapper;
        private readonly IWorkOrderRepository _workOrderRepo;
        public WorkOrderService(IMapper mapper, IAdowayContext dbContext, IWorkOrderRepository workOrderRepo) : base(dbContext)
        {
            _mapper = mapper;
            _workOrderRepo = workOrderRepo;
        }

        public async Task<WorkOrderViewModel> Create(WorkOrderViewModel model)
        {
            var WorkOrderEntity = _mapper.Map<WorkOrderEntity>(model);
            var entity = await _workOrderRepo.Insert(WorkOrderEntity);
            return _mapper.Map<WorkOrderViewModel>(entity);
        }

        public async Task<WorkOrderViewModel> Edit(WorkOrderViewModel model)
        {
            var workOrderEntity = await _workOrderRepo.GetById(model.Id);
            if (workOrderEntity != null)
            {
                workOrderEntity.StartDate = model.StartDate;
                workOrderEntity.EndDate = model.EndDate;
                workOrderEntity.Description = model.Description;
                workOrderEntity.SalesmanId = model.SalesmanId;
                var entity = await _workOrderRepo.Update(workOrderEntity);
                return _mapper.Map<WorkOrderViewModel>(entity);
            }
            return null;
        }
        public async Task<WorkOrderViewModel> Remove(Guid id)
        {
            var entity = await _workOrderRepo.Delete(id);
            return _mapper.Map<WorkOrderViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<WorkOrderViewModel>> SearchWorkOrders(WorkOrderFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<WorkOrderViewModel>().FromSqlRaw("EXEC SP_SearchWorkOrders @Code, @ProjectName, @SupplierName, @RequesterName, @FromDate, @ToDate, @EnterpriseId, @WorkOrderType, @WorkOrderCategory, @ProjectId, @SupplierId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Code", model.Filter.Code),
                SqlParameterHelper.AddNullableStringParameter("@ProjectName", model.Filter.ProjectName),
                SqlParameterHelper.AddNullableStringParameter("@SupplierName", model.Filter.SupplierName),
                SqlParameterHelper.AddNullableStringParameter("@RequesterName", model.Filter.RequesterName),
                SqlParameterHelper.AddNullableDateTimeParameter("@FromDate", model.Filter.FromDate),
                SqlParameterHelper.AddNullableDateTimeParameter("@ToDate", model.Filter.ToDate),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@WorkOrderType", (int?)model.Filter.WorkOrderType),
                SqlParameterHelper.AddNullableInt("@WorkOrderCategory", (int?)model.Filter.WorkOrderCategory),
                SqlParameterHelper.AddNullableGuid("@ProjectId", model.Filter.ProjectId),
                SqlParameterHelper.AddNullableGuid("@SupplierId", model.Filter.SupplierId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<WorkOrderViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
