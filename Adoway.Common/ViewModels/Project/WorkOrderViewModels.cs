using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Project
{
    public class WorkOrderViewModel : BaseEnterpriseViewModel
    {
        public WorkOrderType WorkOrderType { get; set; }
        public WorkOrderCategory WorkOrderCategory { get; set; }
        public string Code { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public WorkOrderStatus Status { get; set; }
        public Guid? CustomerId { get; set; }
        public Guid RequesterId { get; set; }
        public string RequesterName { get; set; }
        public Guid? SalesmanId { get; set; }
        public Guid? ApartmentId { get; set; }
        public string ApartmentName { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; }
        public Guid? SupplierId { get; set; }
        public string SupplierName { get; set; }
    }
    public class WorkOrderFilterViewModel : BaseFilterViewModel
    {
        public WorkOrderFilter Filter { get; set; }
    }
    public class WorkOrderFilter : BaseEnterpriseFilter
    {
        public string Code { get; set; }
        public string ProjectName { get; set; }
        public string SupplierName { get; set; }
        public string RequesterName { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public WorkOrderType? WorkOrderType { get; set; }
        public WorkOrderCategory? WorkOrderCategory { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? SupplierId { get; set; }
        public WorkOrderStatus? Status { get; set; }
    }
}
