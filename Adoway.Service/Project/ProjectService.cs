using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Project;
using Adoway.Data.Entities.Project;
using Adoway.Data.Repositories.Project;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.Project
{
    public class ProjectService : BaseService, IProjectService
    {
        private readonly IMapper _mapper;
        private readonly IProjectRepository _projectRepo;
        public ProjectService(IMapper mapper, IAdowayContext dbContext, IProjectRepository ProjectRepo) : base(dbContext)
        {
            _mapper = mapper;
            _projectRepo = ProjectRepo;
        }

        public async Task<ProjectViewModel> Create(ProjectViewModel model)
        {
            var ProjectEntity = _mapper.Map<ProjectEntity>(model);
            var entity = await _projectRepo.Insert(ProjectEntity);
            return _mapper.Map<ProjectViewModel>(entity);
        }

        public async Task<ProjectViewModel> Edit(ProjectViewModel model)
        {
            var projectEntity = await _projectRepo.GetById(model.Id);
            if (projectEntity != null)
            {
                projectEntity.OwnerId = model.OwnerId;
                projectEntity.SalesUserId = model.SalesUserId;
                projectEntity.TechUserId = model.TechUserId;
                projectEntity.Code = model.Code;
                projectEntity.Name = model.Name;
                projectEntity.ActiveDate = model.ActiveDate;
                projectEntity.BeginDate = model.BeginDate;
                projectEntity.BlockCount = model.BlockCount;
                projectEntity.FloorCount = model.FloorCount;
                projectEntity.BasementCount = model.BasementCount;
                projectEntity.ApartmentCount = model.ApartmentCount;
                projectEntity.SquareCount = model.SquareCount;
                projectEntity.PortCount = model.PortCount;
                projectEntity.Description = model.Description;
                projectEntity.ProjectType = model.ProjectType;
                projectEntity.AreaType = model.AreaType;
                projectEntity.Status = model.Status;
                var entity = await _projectRepo.Update(projectEntity);
                return _mapper.Map<ProjectViewModel>(entity);
            }
            return null;
        }
        public async Task<ProjectViewModel> Remove(Guid id)
        {
            var entity = await _projectRepo.Delete(id);
            return _mapper.Map<ProjectViewModel>(entity);
        }
        public async Task<List<ProjectViewModel>> GetProjects(Guid? enterpriseId)
        {
            var projects = await _projectRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<ProjectViewModel>>(projects);
        }
        public async Task<ApiResponseViewModel<ProjectViewModel>> SearchProjects(ProjectFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<ProjectViewModel>().FromSqlRaw("EXEC SP_SearchProjects @OwnerName, @Code, @Name, @SalesName, @EnterpriseId, @OwnerId, @ProjectType, @AreaType, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@OwnerName", model.Filter.OwnerName),
                SqlParameterHelper.AddNullableStringParameter("@Code", model.Filter.Code),
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@SalesName", model.Filter.SalesName),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableGuid("@OwnerId", model.Filter.OwnerId),
                SqlParameterHelper.AddNullableInt("@ProjectType", (int?)model.Filter.ProjectType),
                SqlParameterHelper.AddNullableInt("@AreaType", (int?)model.Filter.AreaType),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<ProjectViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
