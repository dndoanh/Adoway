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
    public class EventController : ApiBaseController
    {
        private readonly IEventService _eventService;
        public EventController(IWebHostEnvironment webHostEnvironment, IEventService eventService) : base(webHostEnvironment)
        {
            _eventService = eventService;
        }
        [HttpPost]
        public async Task<IActionResult> SearchEvents([FromBody] EventFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _eventService.SearchEvents(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search event");
        }
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _eventService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create event");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateEvent([FromBody] EventViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _eventService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update event");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _eventService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete event");
        }
    }
}
