using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.System;

namespace Adoway.Data.Entities.UserManagement
{
    [Table("Roles")]
    public class RoleEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public Guid? EnterpriseId { get; set; }
        [ForeignKey("EnterpriseId")]
        public EnterpriseEntity Enterprise { get; set; }
    }
}
