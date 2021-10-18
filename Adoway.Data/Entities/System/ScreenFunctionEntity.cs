using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.System
{
    [Table("ScreenFunctions")]
    public class ScreenFunctionEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid ScreenId { get; set; }
        [ForeignKey("ScreenId")]
        public ScreenEntity Screen { get; set; }
    }
}
