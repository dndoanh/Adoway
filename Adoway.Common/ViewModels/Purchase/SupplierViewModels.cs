using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;

namespace Adoway.Common.ViewModels.Purchase
{
    public class SupplierViewModel : BaseEnterpriseViewModel
    {
        public SupplierType SupplierType { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public Status Status { get; set; }
    }
    public class SupplierFilterViewModel : BaseFilterViewModel
    {
        public SupplierFilter Filter { get; set; }
    }
    public class SupplierFilter : BaseEnterpriseFilter
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public SupplierType? SupplierType { get; set; }
        public Status? Status { get; set; }
    }
}
