using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.UserManagement
{
    [Table("RolesInScreens")]
    public class RoleInScreenEntity : BaseEntity
    {
        public bool BelongTo { get; set; }
        public Guid ScreenId { get; set; }
        [ForeignKey("ScreenId")]
        public ScreenEntity Screen { get; set; }
        public Guid RoleId { get; set; }
        [ForeignKey("RoleId")]
        public RoleEntity Role { get; set; }
    }
}
