﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Extensions;
using Adoway.Common.Helpers;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;
using Adoway.Data.Repositories.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace Adoway.Service.UserManagement
{
    public class RoleService : IRoleService
    {
        private readonly IMapper _mapper;
        private readonly IRoleRepository _userRepo;
        private readonly IUserInRoleRepository _userInRoleRepo;
        public RoleService(IMapper mapper, IRoleRepository userRepo, IUserInRoleRepository userInRoleRepo)
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

        public async Task<RoleViewModel> Remove(RoleViewModel model)
        {
            var entity = await _userRepo.Delete(_mapper.Map<RoleEntity>(model));
            return _mapper.Map<RoleViewModel>(entity);
        }
        public async Task<List<RoleViewModel>> GetRoleListByEnterprise(Guid? enterpriseId)
        {
            var roles = await _userRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<RoleViewModel>>(roles);
        }
        // users in roles
        public async Task<List<UserInRoleViewModel>> GetUserInRoleList(Guid roleId)
        {
            var users = await _userInRoleRepo.FindByAsync(u => u.RoleId == roleId);
            return _mapper.Map<List<UserInRoleViewModel>>(users);
        }
    }
}
