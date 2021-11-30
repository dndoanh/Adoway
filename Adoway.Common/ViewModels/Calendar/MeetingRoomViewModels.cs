using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Calendar
{
    public class MeetingRoomViewModel : BaseEnterpriseViewModel
    {
        public string Name { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public bool AllowOverlap { get; set; }
        public Status Status { get; set; }
    }
    public class MeetingRoomFilterViewModel : BaseFilterViewModel
    {
        public MeetingRoomFilter Filter { get; set; }
    }
    public class MeetingRoomFilter : BaseEnterpriseFilter
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Status? Status { get; set; }
    }
}
