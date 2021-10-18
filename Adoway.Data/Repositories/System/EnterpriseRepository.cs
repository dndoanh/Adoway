using Adoway.Data.Context;
using Microsoft.Extensions.Logging;
using Adoway.Data.Repositories.Base;
using Adoway.Data.Entities.System;

namespace Adoway.Data.Repositories.System
{
    public class EnterpriseRepository : Repository<EnterpriseEntity>, IEnterpriseRepository
    {
        public EnterpriseRepository(ILogger<EnterpriseRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
