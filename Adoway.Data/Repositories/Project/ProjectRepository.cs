using System;
using Adoway.Data.Context;
using Adoway.Data.Entities.Project;
using Adoway.Data.Repositories.Base;
using Microsoft.Extensions.Logging;

namespace Adoway.Data.Repositories.Project
{
    public class ProjectRepository : Repository<ProjectEntity>, IProjectRepository
    {
        public ProjectRepository(ILogger<ProjectRepository> logger, IAdowayContext dbContext) : base(logger, dbContext)
        {
        }
    }
}
