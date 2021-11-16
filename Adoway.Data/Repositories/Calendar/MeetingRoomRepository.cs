using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Calendar;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Calendar
{
    public class MeetingRoomRepository : Repository<MeetingRoomEntity>, IMeetingRoomRepository
    {
        public MeetingRoomRepository(ILogger<MeetingRoomRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
