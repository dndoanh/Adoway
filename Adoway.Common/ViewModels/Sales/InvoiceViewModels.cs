using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Sales
{
    public class InvoiceViewModel : BaseEnterpriseViewModel
    {
        public string InvoiceNo { get; set; }
        public DateTime InvoicedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public decimal Amount { get; set; }
        public string Attachments { get; set; }
        public string Description { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public Guid? SupplierId { get; set; }
        public string SupplierName { get; set; }
        public Guid? ProjectId { get; set; }
        public string ProjectName { get; set; }
    }
    public class InvoiceFilterViewModel : BaseFilterViewModel
    {
        public InvoiceFilter Filter { get; set; }
    }
    public class InvoiceFilter : BaseEnterpriseFilter
    {
        public string InvoiceNo { get; set; }
        public string CustomerName { get; set; }
        public string SupplierName { get; set; }
        public string ProjectName { get; set; }
        public Guid? SupplierId { get; set; }
        public Guid? ProjectId { get; set; }
        public PaymentStatus? PaymentStatus { get; set; }
    }
}
