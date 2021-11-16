using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Calendar;
using Adoway.Common.ViewModels.Calendar;

namespace Adoway.BackEnd.Controllers.Calendar
{
    public class MeetingRoomController : ApiBaseController
    {
        private readonly IMeetingRoomService _meetingRoomService;
        public MeetingRoomController(IWebHostEnvironment webHostEnvironment, IMeetingRoomService meetingRoomService) : base(webHostEnvironment)
        {
            _meetingRoomService = meetingRoomService;
        }
        [HttpGet]
        public async Task<IActionResult> GetMeetingRooms()
        {
            var result = await _meetingRoomService.GetMeetingRooms(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchMeetingRooms([FromBody] MeetingRoomFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _meetingRoomService.SearchMeetingRooms(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search meetingRoom");
        }
        [HttpPost]
        public async Task<IActionResult> CreateMeetingRoom([FromBody] MeetingRoomViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _meetingRoomService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create meetingRoom");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateMeetingRoom([FromBody] MeetingRoomViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _meetingRoomService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update meetingRoom");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteMeetingRoom(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _meetingRoomService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete meetingRoom");
        }
    }
}
