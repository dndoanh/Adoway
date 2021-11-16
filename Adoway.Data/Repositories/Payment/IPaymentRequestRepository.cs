using System;
using Adoway.Data.Entities.Payment;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;

namespace Adoway.Data.Repositories.Payment
{
    public interface IPaymentRequestRepository : IRepository<PaymentRequestEntity>
    {
    }
}
