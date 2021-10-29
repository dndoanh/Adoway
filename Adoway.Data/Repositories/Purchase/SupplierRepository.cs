using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Purchase;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Purchase
{
    public class SupplierRepository : Repository<SupplierEntity>, ISupplierRepository
    {
        public SupplierRepository(ILogger<SupplierRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
