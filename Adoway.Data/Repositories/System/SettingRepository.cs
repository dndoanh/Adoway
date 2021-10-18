using Adoway.Data.Context;
using Microsoft.Extensions.Logging;
using Adoway.Data.Repositories.Base;
using Adoway.Data.Entities.System;

namespace Adoway.Data.Repositories.System
{
    public class SettingRepository : Repository<SettingEntity>, ISettingRepository
    {
        public SettingRepository(ILogger<SettingEntity> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
