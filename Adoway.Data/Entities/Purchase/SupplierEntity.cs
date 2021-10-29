using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.Purchase
{
    [Table("Suppliers")]
    public class SupplierEntity : BaseEnterpriseEntity
    {
        public SupplierType SupplierType { get; set; }
        [Required]
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public Status Status { get; set; }
    }
}
