using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.Base
{
    [Table("Settings")]
    public class SettingEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
