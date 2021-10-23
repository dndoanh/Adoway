using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.HumanResource
{
    public class DepartmentEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? ManagerId { get; set; }
        public Status Status { get; set; }
        public Guid? ParentId { get; set; }
        [ForeignKey("ParentId")]
        public DepartmentEntity Parent { get; set; }
    }
}
