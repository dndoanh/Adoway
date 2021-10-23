using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.UserManagement;

namespace Adoway.Data.Entities.Project
{
    public class ProjectEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime? ActiveDate { get; set; }
        public DateTime? BeginDate { get; set; }
        public int BlockCount { get; set; }
        public int FloorCount { get; set; }
        public int BasementCount { get; set; }
        public int SquareCount { get; set; }
        public int PortCount { get; set; }
        public int ApartmentCount { get; set; }
        public ProjectType ProjectType { get; set; }
        public AreaType AreaType { get; set; }
        public ProjectStatus Status { get; set; }
        public Guid OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public OwnerEntity Owner { get; set; }
        public Guid? SalesUserId { get; set; }
        [ForeignKey("SalesUserId")]
        public UserEntity SalesUser { get; set; }
        public Guid? TechUserId { get; set; }
        [ForeignKey("TechUserId")]
        public UserEntity TechUser { get; set; }
    }
}
