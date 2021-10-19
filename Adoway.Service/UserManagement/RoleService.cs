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
        private readonly IRoleRepository _roleRepo;
        private readonly IRoleInScreenRepository _roleInScreenRepo;
        private readonly IRoleInScreenFunctionRepository _roleInScreenFunctionRepo;
        public RoleService(IMapper mapper, IAdowayContext dbContext, IRoleRepository roleRepo, IRoleInScreenRepository roleInScreenRepo, IRoleInScreenFunctionRepository roleInScreenFunctionRepo) : base(dbContext)
        {
            _mapper = mapper;
            _roleRepo = roleRepo;
            _roleInScreenRepo = roleInScreenRepo;
            _roleInScreenFunctionRepo = roleInScreenFunctionRepo;
        }

        public async Task<RoleViewModel> Create(RoleViewModel model)
        {
            var roleEntity = _mapper.Map<RoleEntity>(model);
            var entity = await _roleRepo.Insert(roleEntity);
            return _mapper.Map<RoleViewModel>(entity);
        }

        public async Task<RoleViewModel> Edit(RoleViewModel model)
        {
            var roleEntity = await _roleRepo.GetById(model.Id);
            if (roleEntity != null)
            {
                roleEntity.Name = model.Name;
                roleEntity.Status = model.Status;
                roleEntity.Description = model.Description;
                var entity = await _roleRepo.Update(roleEntity);
                return _mapper.Map<RoleViewModel>(entity);
            }
            return null;
        }

        public async Task<List<RoleViewModel>> GetAll()
        {
            var list = await _roleRepo.GetAll().ToListAsync();
            return _mapper.Map<List<RoleViewModel>>(list.ToList());
        }

        public async Task<RoleViewModel> Remove(Guid id)
        {
            var entity = await _roleRepo.Delete(id);
            return _mapper.Map<RoleViewModel>(entity);
        }
        public async Task<List<RoleViewModel>> GetRolesByEnterprise(Guid? enterpriseId)
        {
            var roles = await _roleRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
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
        public async Task<List<RoleInScreenViewModel>> GetRoleInScreens(Guid roleId)
        {
            var roleInScreens = await (from a in DbContext.Screens
                                       join b in DbContext.RolesInScreens on new { Id = a.Id, RoleId = roleId } equals new { Id = b.ScreenId, b.RoleId } into ps
                                       from b in ps.DefaultIfEmpty()
                                       select new RoleInScreenViewModel
                                       {
                                           Id = b == null ? Guid.NewGuid() : b.Id,
                                           ScreenId = a.Id,
                                           ScreenName = a.Name,
                                           RoleId = roleId,
                                           BelongTo = b == null ? false : b.BelongTo
                                       }).ToListAsync();
            foreach (var item in roleInScreens)
            {
                item.ScreenFunctions = await (from a in DbContext.ScreenFunctions
                                              join b in DbContext.RolesInScreenFunctions on new { Id = a.Id, RoleId = roleId } equals new { Id = b.ScreenFunctionId, b.RoleId } into ps
                                              from b in ps.DefaultIfEmpty()
                                              where a.ScreenId == item.ScreenId
                                              select new RoleInScreenFunctionViewModel
                                              {
                                                  Id = b == null ? Guid.NewGuid() : b.Id,
                                                  ScreenFunctionId = a.Id,
                                                  FunctionName = a.Name,
                                                  RoleId = roleId,
                                                  BelongTo = b == null ? false : b.BelongTo
                                              }).ToListAsync();
            }
            return _mapper.Map<List<RoleInScreenViewModel>>(roleInScreens);
        }
        public async Task<List<RoleInScreenViewModel>> EditRoleInScreens(List<RoleInScreenViewModel> model)
        {
            foreach (var item in model)
            {
                var roleInScreenEntity = await _roleInScreenRepo.GetById(item.Id);
                if (roleInScreenEntity != null)
                {
                    roleInScreenEntity.BelongTo = item.BelongTo;
                    await _roleInScreenRepo.Update(roleInScreenEntity);
                }
                else
                {
                    await _roleInScreenRepo.Insert(new RoleInScreenEntity
                    {
                        RoleId = item.RoleId,
                        ScreenId = item.ScreenId,
                        BelongTo = item.BelongTo
                    }); ;
                }
                if (!item.BelongTo)
                {
                    foreach (var func in item.ScreenFunctions)
                    {
                        func.BelongTo = false;
                    }
                }
                foreach (var func in item.ScreenFunctions)
                {
                    var roleInScreenFunctionEntity = await _roleInScreenFunctionRepo.GetById(func.Id);
                    if (roleInScreenFunctionEntity != null)
                    {
                        roleInScreenFunctionEntity.BelongTo = func.BelongTo;
                        await _roleInScreenFunctionRepo.Update(roleInScreenFunctionEntity);
                    }
                    else
                    {
                        await _roleInScreenFunctionRepo.Insert(new RoleInScreenFunctionEntity
                        {
                            RoleId = item.RoleId,
                            ScreenFunctionId = func.ScreenFunctionId,
                            BelongTo = func.BelongTo
                        }); ;
                    }
                }
            }
            return model;
        }
    }
}
