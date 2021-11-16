using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Sales;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;
using Adoway.Common.ViewModels.Calendar;
using Adoway.Data.Repositories.Calendar;
using Adoway.Data.Entities.Calendar;
using System.Linq;

namespace Adoway.Service.Calendar
{
    public class EventService : BaseService, IEventService
    {
        private readonly IMapper _mapper;
        private readonly IEventRepository _eventRepo;
        private readonly IEventAttendeeRepository _eventAttendeeRepo;
        public EventService(IMapper mapper, IAdowayContext dbContext, IEventRepository eventRepo, IEventAttendeeRepository eventAttendeeRepo) : base(dbContext)
        {
            _mapper = mapper;
            _eventRepo = eventRepo;
            _eventAttendeeRepo = eventAttendeeRepo;
        }

        public async Task<EventViewModel> Create(EventViewModel model)
        {
            var eventEntity = _mapper.Map<EventEntity>(model);
            var entity = await _eventRepo.Insert(eventEntity);
            foreach (var attendee in model.Attendees)
            {
                attendee.EventId = entity.Id;
                attendee.Status = Common.Enums.AttendeeStatus.Unconfirmed;
                await _eventAttendeeRepo.Insert(_mapper.Map<EventAttendeeEntity>(attendee));
            }
            return _mapper.Map<EventViewModel>(entity);
        }

        public async Task<EventViewModel> Edit(EventViewModel model)
        {
            var eventEntity = await DbContext.Events.Include(x => x.Attendees).FirstOrDefaultAsync(x => x.Id == model.Id);
            if (eventEntity != null)
            {
                eventEntity.Title = model.Title;
                eventEntity.StartDate = model.StartDate;
                eventEntity.EndDate = model.EndDate;
                eventEntity.Description = model.Description;
                eventEntity.MeetingRoomId = model.MeetingRoomId;
                var entity = await _eventRepo.Update(eventEntity);
                foreach (var attendee in model.Attendees)
                {
                    if (!eventEntity.Attendees.Any(x => x.AttendeeId == attendee.AttendeeId))
                    {
                        attendee.EventId = eventEntity.Id;
                        attendee.Status = Common.Enums.AttendeeStatus.Unconfirmed;
                        await _eventAttendeeRepo.Insert(_mapper.Map<EventAttendeeEntity>(attendee));
                    }
                }
                foreach (var attendee in eventEntity.Attendees)
                {
                    if (!model.Attendees.Any(x => x.AttendeeId == attendee.AttendeeId))
                    {
                        await _eventAttendeeRepo.Delete(attendee.Id);
                    }
                }
                return _mapper.Map<EventViewModel>(entity);
            }
            return null;
        }
        public async Task<EventViewModel> Remove(Guid id)
        {
            var entity = await _eventRepo.Delete(id);
            return _mapper.Map<EventViewModel>(entity);
        }
        public async Task<ApiResponseViewModel<EventViewModel>> SearchEvents(EventFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<EventViewModel>().FromSqlRaw("EXEC SP_SearchEvents @Title, @MeetingRoomName, @FromDate, @ToDate, @EnterpriseId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Title", model.Filter.Title),
                SqlParameterHelper.AddNullableStringParameter("@MeetingRoomName", model.Filter.MeetingRoomName),
                SqlParameterHelper.AddNullableDateTimeParameter("@FromDate", model.Filter.FromDate),
                SqlParameterHelper.AddNullableDateTimeParameter("@ToDate", model.Filter.ToDate),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<EventViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
