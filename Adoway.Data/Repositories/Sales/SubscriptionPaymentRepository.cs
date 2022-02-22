using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Sales
{
    public class SubscriptionPaymentRepository : Repository<SubscriptionPaymentEntity>, ISubscriptionPaymentRepository
    {
        public SubscriptionPaymentRepository(ILogger<SubscriptionPaymentRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
