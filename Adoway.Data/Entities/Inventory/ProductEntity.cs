using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

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
    }
}
