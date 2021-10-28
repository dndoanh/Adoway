using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.Purchase;

namespace Adoway.Data.Entities.Inventory
{
    public class ProductEntity : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public decimal SalesPrice { get; set; }
        public MeasureUnit MeasureUnit { get; set; }
        public string FeaturePhoto { get; set; }
        public string Photos { get; set; }
        public Status Status { get; set; }

        public Guid CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public CategoryEntity Category { get; set; }
        public Guid? SupplierId { get; set; }
        [ForeignKey("SupplierId")]
        public SupplierEntity Supplier { get; set; }
    }
}
