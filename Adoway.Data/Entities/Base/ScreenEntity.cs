using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.Base
{
    [Table("Screens")]
    public class ScreenEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Path { get; set; }
        public string Description { get; set; }
    }
}
