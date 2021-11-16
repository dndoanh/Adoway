using System;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.Project;
using Adoway.Data.Entities.Purchase;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Entities.UserManagement;

namespace Adoway.Data.Entities.Payment
{
    [Table("PaymentRequests")]
    public class PaymentRequestEntity : BaseEnterpriseEntity
    {
        public string RequestNo { get; set; }
        public DateTime? DueDate { get; set; }
        public decimal DepositAmount { get; set; }
        public decimal Amount { get; set; }
        public string Attachments { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public PaymentRequestStatus Status { get; set; }
        public Guid RequesterId { get; set; }
        [ForeignKey("RequesterId")]
        public UserEntity Requester { get; set; }
        public Guid? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public CustomerEntity Customer { get; set; }
        public Guid? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public ProjectEntity Project { get; set; }
    }

    [Table("PaymentDetails")]
    public class PaymentDetailEntity : BaseEnterpriseEntity
    {
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string Attachments { get; set; }
        public string Description { get; set; }
        public Guid PaymentRequestId { get; set; }
        [ForeignKey("PaymentRequestId")]
        public PaymentRequestEntity PaymentRequest { get; set; }
    }
}
