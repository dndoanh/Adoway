using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Inventory
{
    public class ProductRepository : Repository<ProductEntity>, IProductRepository
    {
        public ProductRepository(ILogger<ProductRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
