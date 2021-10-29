using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Project;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Project
{
    public class OwnerRepository : Repository<OwnerEntity>, IOwnerRepository
    {
        public OwnerRepository(ILogger<OwnerRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
