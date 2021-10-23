using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.Inventory
{
    public class ProductCategoryEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? ParentId { get; set; }
        [ForeignKey("ParentId")]
        public ProductCategoryEntity Parent { get; set; }
    }
}
