using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Payment;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Payment
{
    public class PaymentRequestRepository : Repository<PaymentRequestEntity>, IPaymentRequestRepository
    {
        public PaymentRequestRepository(ILogger<PaymentRequestRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
