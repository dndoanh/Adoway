using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Project;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Project
{
    public class WorkOrderRepository : Repository<WorkOrderEntity>, IWorkOrderRepository
    {
        public WorkOrderRepository(ILogger<WorkOrderRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
