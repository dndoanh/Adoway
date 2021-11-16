using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Calendar;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Calendar
{
    public interface IMeetingRoomService
    {
        Task<MeetingRoomViewModel> Create(MeetingRoomViewModel model);
        Task<MeetingRoomViewModel> Edit(MeetingRoomViewModel model);
        Task<MeetingRoomViewModel> Remove(Guid id);
        Task<List<MeetingRoomViewModel>> GetMeetingRooms(Guid? enterpriseId);
        Task<ApiResponseViewModel<MeetingRoomViewModel>> SearchMeetingRooms(MeetingRoomFilterViewModel model);
    }
}
