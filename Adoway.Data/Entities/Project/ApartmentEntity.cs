using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.Sales;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.Project
{
    [Table("Apartments")]
    public class ApartmentEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Floor { get; set; }
        public string Block { get; set; }
        public string InternetLine { get; set; }
        public string TvLine { get; set; }
        public Guid? OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public CustomerEntity Owner { get; set; }
        public Guid ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public ProjectEntity Project { get; set; }
    }
}
