using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;
using Adoway.Data.Repositories.UserManagement;
using Microsoft.EntityFrameworkCore;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Context;
using Adoway.Service.Base;
using System.Data;

namespace Adoway.Service.UserManagement
{
    public class RoleService : BaseService, IRoleService
    {
        private readonly IMapper _mapper;
        private readonly IRoleRepository _userRepo;
        private readonly IUserInRoleRepository _userInRoleRepo;
        public RoleService(IMapper mapper, IAdowayContext dbContext, IRoleRepository userRepo, IUserInRoleRepository userInRoleRepo) : base(dbContext)
        {
            _mapper = mapper;
            _userRepo = userRepo;
            _userInRoleRepo = userInRoleRepo;
        }

        public async Task<RoleViewModel> Create(RoleViewModel model)
        {
            var roleEntity = _mapper.Map<RoleEntity>(model);
            var entity = await _userRepo.Insert(roleEntity);
            return _mapper.Map<RoleViewModel>(entity);
        }

        public async Task<RoleViewModel> Edit(RoleViewModel model)
        {
            var roleEntity = await _userRepo.GetById(model.Id);
            if (roleEntity != null)
            {
                roleEntity.Name = model.Name;
                roleEntity.Status = model.Status;
                roleEntity.Description = model.Description;
                roleEntity.EnterpriseId = model.EnterpriseId;
                var entity = await _userRepo.Update(roleEntity);
                return _mapper.Map<RoleViewModel>(entity);
            }
            return null;
        }

        public async Task<List<RoleViewModel>> GetAll()
        {
            var list = await _userRepo.GetAll().ToListAsync();
            return _mapper.Map<List<RoleViewModel>>(list.ToList());
        }

        public async Task<RoleViewModel> Remove(Guid id)
        {
            var entity = await _userRepo.Delete(id);
            return _mapper.Map<RoleViewModel>(entity);
        }
        public async Task<List<RoleViewModel>> GetRolesByEnterprise(Guid? enterpriseId)
        {
            var roles = await _userRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<RoleViewModel>>(roles);
        }
        public async Task<ApiResponseViewModel<RoleViewModel>> SearchRoles(RoleFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<RoleViewModel>().FromSqlRaw("EXEC SP_SearchRoles @Name, @Description, @EnterpriseId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Description", model.Filter.Description),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<RoleViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }

        // users in roles
        public async Task<List<UserInRoleViewModel>> GetUserInRoleList(Guid roleId)
        {
            var users = await _userInRoleRepo.FindByAsync(u => u.RoleId == roleId);
            return _mapper.Map<List<UserInRoleViewModel>>(users);
        }
    }
}
