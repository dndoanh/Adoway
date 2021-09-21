using Adoway.Common.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.Base
{
    [Table("Languages")]
    public class LanguageEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Locale { get; set; }
        public Status Status { get; set; }
        public bool IsDefault { get; set; }
    }
}
