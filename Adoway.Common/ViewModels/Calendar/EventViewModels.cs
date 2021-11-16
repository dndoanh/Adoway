using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Calendar
{
    public class EventViewModel : BaseEnterpriseViewModel
    {
        public string Title { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public EventStatus Status { get; set; }
        public Guid MeetingRoomId { get; set; }
        public string MeetingRoomName { get; set; }
        public List<AttendeeViewModel> Attendees { get; set; }
    }
    public class AttendeeViewModel : BaseEnterpriseViewModel
    {
        public Guid EventId { get; set; }
        public string EventName { get; set; }
        public Guid AttendeeId { get; set; }
        public string AttendeeName { get; set; }
        public AttendeeStatus Status { get; set; }
    }
    public class EventFilterViewModel : BaseFilterViewModel
    {
        public EventFilter Filter { get; set; }
    }
    public class EventFilter : BaseEnterpriseFilter
    {
        public string Title { get; set; }
        public string MeetingRoomName { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public EventStatus? Status { get; set; }
    }
}
