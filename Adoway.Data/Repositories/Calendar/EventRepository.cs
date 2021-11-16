using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Calendar;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Calendar
{
    public class EventRepository : Repository<EventEntity>, IEventRepository
    {
        public EventRepository(ILogger<EventRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
    public class EventAttendeeRepository : Repository<EventAttendeeEntity>, IEventAttendeeRepository
    {
        public EventAttendeeRepository(ILogger<EventAttendeeRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
