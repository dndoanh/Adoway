using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Data.Entities.Calendar
{
    [Table("MeetingRooms")]
    public class MeetingRoomEntity : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public bool AllowOverlap { get; set; }
        public Status Status { get; set; }
    }
}
