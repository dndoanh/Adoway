using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.UserManagement;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Data.Entities.Calendar
{
    [Table("Events")]
    public class EventEntity : BaseEnterpriseEntity
    {
        [Required]
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public EventStatus Status { get; set; }
        public Guid MeetingRoomId { get; set; }
        [ForeignKey("MeetingRoomId")]
        public MeetingRoomEntity MeetingRoom { get; set; }
        public ICollection<EventAttendeeEntity> Attendees { get; set; }
    }

    [Table("EventAttendees")]
    public class EventAttendeeEntity : BaseEnterpriseEntity
    {
        public Guid EventId { get; set; }
        [ForeignKey("EventId")]
        public EventEntity Event { get; set; }
        public Guid AttendeeId { get; set; }
        [ForeignKey("AttendeeId")]
        public UserEntity Attendee { get; set; }
        public AttendeeStatus Status { get; set; }
    }
}
