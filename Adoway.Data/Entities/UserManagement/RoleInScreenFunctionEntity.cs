using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.System;

namespace Adoway.Data.Entities.UserManagement
{
    [Table("RolesInScreenFunctions")]
    public class RoleInScreenFunctionEntity : BaseEntity
    {
        public bool BelongTo { get; set; }
        public Guid ScreenFunctionId { get; set; }
        [ForeignKey("ScreenFunctionId")]
        public ScreenFunctionEntity ScreenFunction { get; set; }
        public Guid RoleId { get; set; }
        [ForeignKey("RoleId")]
        public RoleEntity Role { get; set; }
    }
}
