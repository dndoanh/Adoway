using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Project;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Project
{
    public class ApartmentRepository : Repository<ApartmentEntity>, IApartmentRepository
    {
        public ApartmentRepository(ILogger<ApartmentRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
