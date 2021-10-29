using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.Inventory
{
    [Table("Categories")]
    public class CategoryEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? ParentId { get; set; }
        [ForeignKey("ParentId")]
        public CategoryEntity Parent { get; set; }
    }
}
