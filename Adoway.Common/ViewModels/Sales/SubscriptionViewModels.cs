using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;

namespace Adoway.Common.ViewModels.Sales
{
    public class SubscriptionViewModel : BaseEnterpriseViewModel
    {
        public string ContractCode { get; set; }
        public string CustomerCode { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public SubscriptionPeriod SubscriptionPeriod { get; set; }
        public decimal SalesPrice { get; set; }
        public int FreeMonth { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid? ApartmentId { get; set; }
        public string ApartmentName { get; set; }
        public string ProjectName { get; set; }
    }
    public class SubscriptionFilterViewModel : BaseFilterViewModel
    {
        public SubscriptionFilter Filter { get; set; }
    }
    public class SubscriptionFilter : BaseEnterpriseFilter
    {
        public string ContractCode { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string ApartmentName { get; set; }
        public Status? Status { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? ProjectId { get; set; }
    }
}
