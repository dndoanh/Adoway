using Adoway.Data.Context;
using Microsoft.Extensions.Logging;
using Adoway.Data.Repositories.Base;
using Adoway.Data.Entities.System;

namespace Adoway.Data.Repositories.System
{
    public class LanguageRepository : Repository<LanguageEntity>, ILanguageRepository
    {
        public LanguageRepository(ILogger<LanguageRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
