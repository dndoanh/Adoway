using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Inventory
{
    public class CategoryRepository : Repository<CategoryEntity>, ICategoryRepository
    {
        public CategoryRepository(ILogger<CategoryRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
