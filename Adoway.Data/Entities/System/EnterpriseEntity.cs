using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.System
{
    [Table("Enterprises")]
    public class EnterpriseEntity : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }
    }
}
