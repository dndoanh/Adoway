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
    public class OwnerService : BaseService, IOwnerService
    {
        private readonly IMapper _mapper;
        private readonly IOwnerRepository _ownerRepo;
        public OwnerService(IMapper mapper, IAdowayContext dbContext, IOwnerRepository OwnerRepo) : base(dbContext)
        {
            _mapper = mapper;
            _ownerRepo = OwnerRepo;
        }

        public async Task<OwnerViewModel> Create(OwnerViewModel model)
        {
            var OwnerEntity = _mapper.Map<OwnerEntity>(model);
            var entity = await _ownerRepo.Insert(OwnerEntity);
            return _mapper.Map<OwnerViewModel>(entity);
        }

        public async Task<OwnerViewModel> Edit(OwnerViewModel model)
        {
            var ownerEntity = await _ownerRepo.GetById(model.Id);
            if (ownerEntity != null)
            {
                ownerEntity.Name = model.Name;
                ownerEntity.Address = model.Address;
                ownerEntity.ContactName = model.ContactName;
                ownerEntity.ContactPhone = model.ContactPhone;
                ownerEntity.ContactEmail = model.ContactEmail;
                ownerEntity.Status = model.Status;
                var entity = await _ownerRepo.Update(ownerEntity);
                return _mapper.Map<OwnerViewModel>(entity);
            }
            return null;
        }
        public async Task<OwnerViewModel> Remove(Guid id)
        {
            var entity = await _ownerRepo.Delete(id);
            return _mapper.Map<OwnerViewModel>(entity);
        }
        public async Task<List<OwnerViewModel>> GetOwners(Guid? enterpriseId)
        {
            var owners = await _ownerRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<OwnerViewModel>>(owners);
        }
        public async Task<ApiResponseViewModel<OwnerViewModel>> SearchOwners(OwnerFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<OwnerViewModel>().FromSqlRaw("EXEC SP_SearchOwners @Name, @Address, @ContactName, @ContactPhone, @ContactEmail, @EnterpriseId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Address", model.Filter.Address),
                SqlParameterHelper.AddNullableStringParameter("@ContactName", model.Filter.ContactName),
                SqlParameterHelper.AddNullableStringParameter("@ContactPhone", model.Filter.ContactPhone),
                SqlParameterHelper.AddNullableStringParameter("@ContactEmail", model.Filter.ContactEmail),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<OwnerViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }
    }
}
