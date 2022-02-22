using System;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.Sales
{
    [Table("SubscriptionPayments")]
    public class SubscriptionPaymentEntity : BaseEnterpriseEntity
    {
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public Guid SubscriptionId { get; set; }
        [ForeignKey("SubscriptionId")]
        public SubscriptionEntity Subscription { get; set; }
    }
}
