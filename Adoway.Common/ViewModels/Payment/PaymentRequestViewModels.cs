using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using System;

namespace Adoway.Common.ViewModels.Payment
{
    public class PaymentRequestViewModel : BaseEnterpriseViewModel
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
        public string RequesterName { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public Guid? ProjectId { get; set; }
        public string ProjectName { get; set; }
    }
    public class PaymentRequestFilterViewModel : BaseFilterViewModel
    {
        public PaymentRequestFilter Filter { get; set; }
    }
    public class PaymentRequestFilter : BaseEnterpriseFilter
    {
        public string RequestNo { get; set; }
        public string RequesterName { get; set; }
        public string CustomerName { get; set; }
        public string ProjectName { get; set; }
        public Guid? ProjectId { get; set; }
        public PaymentRequestStatus? PaymentRequestStatus { get; set; }
        public PaymentMethod? PaymentMethod { get; set; }
    }
}
