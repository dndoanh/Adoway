using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Sales
{
    public class InvoiceRepository : Repository<InvoiceEntity>, IInvoiceRepository
    {
        public InvoiceRepository(ILogger<InvoiceRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
