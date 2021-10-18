using Adoway.Data.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.System
{
    [Table("Settings")]
    public class SettingEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Key { get; set; }
        public string Value { get; set; }

        public Guid? EnterpriseId { get; set; }
        [ForeignKey("EnterpriseId")]
        public EnterpriseEntity Enterprise { get; set; }
    }
}
