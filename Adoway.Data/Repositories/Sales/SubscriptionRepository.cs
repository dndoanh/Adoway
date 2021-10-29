using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Sales
{
    public class SubscriptionRepository : Repository<SubscriptionEntity>, ISubscriptionRepository
    {
        public SubscriptionRepository(ILogger<SubscriptionRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
