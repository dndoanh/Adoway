using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;

namespace Adoway.Common.ViewModels.Sales
{
    public class SubscriptionPaymentEditModel : BaseEnterpriseViewModel
    {
        public Guid ProjectId { get; set; }
        public Guid SupplierId { get; set; }
        public string ContractCode { get; set; }
        public string CustomerName { get; set; }
        public Status Status { get; set; }
        public string Description { get; set; }
        public decimal Jan { get; set; }
        public decimal Feb { get; set; }
        public decimal Mar { get; set; }
        public decimal Apr { get; set; }
        public decimal May { get; set; }
        public decimal Jun { get; set; }
        public decimal Jul { get; set; }
        public decimal Aug { get; set; }
        public decimal Sep { get; set; }
        public decimal Oct { get; set; }
        public decimal Nov { get; set; }
        public decimal Dec { get; set; }
        public decimal Total { get; set; }
    }

    public class SubscriptionPaymentViewModel : BaseEnterpriseViewModel
    {
        public string ProjectName { get; set; }
        public string ApartmentName { get; set; }
        public string ProductName { get; set; }
        public string SupplierName { get; set; }
        public string ContractCode { get; set; }
        public string CustomerName { get; set; }
        public Status Status { get; set; }
        public string Description { get; set; }
        public decimal Jan { get; set; }
        public decimal Feb { get; set; }
        public decimal Mar { get; set; }
        public decimal Apr { get; set; }
        public decimal May { get; set; }
        public decimal Jun { get; set; }
        public decimal Jul { get; set; }
        public decimal Aug { get; set; }
        public decimal Sep { get; set; }
        public decimal Oct { get; set; }
        public decimal Nov { get; set; }
        public decimal Dec { get; set; }
        public decimal Total { get; set; }
    }
    public class SubscriptionPaymentFilterViewModel : BaseFilterViewModel
    {
        public SubscriptionFilter Filter { get; set; }
    }
    public class SubscriptionPaymentFilter : BaseEnterpriseFilter
    {
        public Guid? ProjectId { get; set; }
        public Guid? SupplierId { get; set; }
    }
}
