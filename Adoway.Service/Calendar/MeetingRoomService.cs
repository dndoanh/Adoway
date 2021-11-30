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

namespace Adoway.Service.Calendar
{
    public class MeetingRoomService : BaseService, IMeetingRoomService
    {
        private readonly IMapper _mapper;
        private readonly IMeetingRoomRepository _meetingRoomRepo;
        public MeetingRoomService(IMapper mapper, IAdowayContext dbContext, IMeetingRoomRepository MeetingRoomRepo) : base(dbContext)
        {
            _mapper = mapper;
            _meetingRoomRepo = MeetingRoomRepo;
        }

        public async Task<MeetingRoomViewModel> Create(MeetingRoomViewModel model)
        {
            var meetingRoomEntity = _mapper.Map<MeetingRoomEntity>(model);
            var entity = await _meetingRoomRepo.Insert(meetingRoomEntity);
            return _mapper.Map<MeetingRoomViewModel>(entity);
        }

        public async Task<MeetingRoomViewModel> Edit(MeetingRoomViewModel model)
        {
            var meetingRoomEntity = await _meetingRoomRepo.GetById(model.Id);
            if (meetingRoomEntity != null)
            {
                meetingRoomEntity.Name = model.Name;
                meetingRoomEntity.Color = model.Color;
                meetingRoomEntity.Description = model.Description;
                meetingRoomEntity.AllowOverlap = model.AllowOverlap;
                meetingRoomEntity.Status = model.Status;
                var entity = await _meetingRoomRepo.Update(meetingRoomEntity);
                return _mapper.Map<MeetingRoomViewModel>(entity);
            }
            return null;
        }
        public async Task<MeetingRoomViewModel> Remove(Guid id)
        {
            var entity = await _meetingRoomRepo.Delete(id);
            return _mapper.Map<MeetingRoomViewModel>(entity);
        }
        public async Task<List<MeetingRoomViewModel>> GetMeetingRooms(Guid? enterpriseId)
        {
            var meetingRooms = await _meetingRoomRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<MeetingRoomViewModel>>(meetingRooms);
        }
        public async Task<ApiResponseViewModel<MeetingRoomViewModel>> SearchMeetingRooms(MeetingRoomFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<MeetingRoomViewModel>().FromSqlRaw("EXEC SP_SearchMeetingRooms @Name, @Description, @EnterpriseId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Description", model.Filter.Description),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<MeetingRoomViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
