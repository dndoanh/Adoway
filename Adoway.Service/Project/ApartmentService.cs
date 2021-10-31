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
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.Project
{
    public class ApartmentService : BaseService, IApartmentService
    {
        private readonly IMapper _mapper;
        private readonly IApartmentRepository _apartmentRepo;
        public ApartmentService(IMapper mapper, IAdowayContext dbContext, IApartmentRepository ApartmentRepo) : base(dbContext)
        {
            _mapper = mapper;
            _apartmentRepo = ApartmentRepo;
        }

        public async Task<ApartmentViewModel> Create(ApartmentViewModel model)
        {
            var ApartmentEntity = _mapper.Map<ApartmentEntity>(model);
            var entity = await _apartmentRepo.Insert(ApartmentEntity);
            return _mapper.Map<ApartmentViewModel>(entity);
        }

        public async Task<ApartmentViewModel> Edit(ApartmentViewModel model)
        {
            var apartmentEntity = await _apartmentRepo.GetById(model.Id);
            if (apartmentEntity != null)
            {
                apartmentEntity.ProjectId = model.ProjectId;
                apartmentEntity.OwnerId = model.OwnerId;
                apartmentEntity.Name = model.Name;
                apartmentEntity.Floor = model.Floor;
                apartmentEntity.Block = model.Name;
                apartmentEntity.InternetLine = model.InternetLine;
                apartmentEntity.TvLine = model.TvLine;
                apartmentEntity.Description = model.Description;
                var entity = await _apartmentRepo.Update(apartmentEntity);
                return _mapper.Map<ApartmentViewModel>(entity);
            }
            return null;
        }
        public async Task<ApartmentViewModel> Remove(Guid id)
        {
            var entity = await _apartmentRepo.Delete(id);
            return _mapper.Map<ApartmentViewModel>(entity);
        }
        public async Task<List<ApartmentViewModel>> GetApartments(Guid? enterpriseId, Guid? projectId)
        {
            var apartments = await _apartmentRepo.FindByAsync(u => u.EnterpriseId == enterpriseId && u.ProjectId == projectId);
            return _mapper.Map<List<ApartmentViewModel>>(apartments);
        }
        public async Task<ApiResponseViewModel<ApartmentViewModel>> SearchApartments(ApartmentFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<ApartmentViewModel>().FromSqlRaw("EXEC SP_SearchApartments @ProjectName, @OwnerName, @Name, @Floor, @Block, @InternetLine, @TvLine, @EnterpriseId, @ProjectId, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@ProjectName", model.Filter.ProjectName),
                SqlParameterHelper.AddNullableStringParameter("@OwnerName", model.Filter.OwnerName),
                SqlParameterHelper.AddNullableStringParameter("@Floor", model.Filter.Floor),
                SqlParameterHelper.AddNullableStringParameter("@Block", model.Filter.Block),
                SqlParameterHelper.AddNullableStringParameter("@InternetLine", model.Filter.InternetLine),
                SqlParameterHelper.AddNullableStringParameter("@TvLine", model.Filter.TvLine),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableGuid("@ProjectId", model.Filter.ProjectId),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<ApartmentViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
