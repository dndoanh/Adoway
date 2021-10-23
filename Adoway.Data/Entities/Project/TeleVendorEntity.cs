using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using System.ComponentModel.DataAnnotations;

namespace Adoway.Data.Entities.Project
{
    public class TeleVendorEntity  : BaseEnterpriseEntity
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
