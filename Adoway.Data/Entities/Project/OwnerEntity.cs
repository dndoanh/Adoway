using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.Project
{
    [Table("Owners")]
    public class OwnerEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public Status Status { get; set; }
    }
}
