using System;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.Project;
using Adoway.Data.Entities.Purchase;

namespace Adoway.Data.Entities.Sales
{
    [Table("Invoices")]
    public class InvoiceEntity : BaseEnterpriseEntity
    {
        public string InvoiceNo { get; set; }
        public DateTime InvoicedDate { get; set; }
        public DateTime? DueDate { get; set; }
        public decimal Amount { get; set; }
        public string Attachments { get; set; }
        public string Description { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public Guid CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public CustomerEntity Customer { get; set; }
        public Guid? SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public SupplierEntity Supplier { get; set; }
        public Guid? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public ProjectEntity Project { get; set; }
    }
}
