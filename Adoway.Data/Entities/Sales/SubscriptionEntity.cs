using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Entities.Project;

namespace Adoway.Data.Entities.Sales
{
    [Table("Subscriptions")]
    public class SubscriptionEntity : BaseEnterpriseEntity
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
        [ForeignKey("CustomerId")]
        public CustomerEntity Customer { get; set; }
        public Guid ProductId { get; set; }
        [ForeignKey("ProductId")]
        public ProductEntity Product { get; set; }
        public Guid? ApartmentId { get; set; }
        [ForeignKey("ApartmentId")]
        public ApartmentEntity Apartment { get; set; }
    }
}
