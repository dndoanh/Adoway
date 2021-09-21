using System;
using Adoway.Data.Context;
using Microsoft.Extensions.Logging;
using Adoway.Data.Repositories.Base;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Repositories.Base
{
    public class LanguageRepository : Repository<LanguageEntity>, ILanguageRepository
    {
        public LanguageRepository(ILogger<LanguageRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
