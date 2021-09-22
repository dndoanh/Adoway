using System;
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
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        public UserService(IMapper mapper, IUserRepository userRepo)
        {
            _mapper = mapper;
            _userRepo = userRepo;
        }

        public async Task<UserViewModel> Create(UserViewModel model)
        {
            var userEntity = _mapper.Map<UserEntity>(model);
            userEntity.Password = SecurityHelper.SHA1Hash(SecurityHelper.GeneratePassword(8));
            var entity = await _userRepo.Insert(userEntity);
            return _mapper.Map<UserViewModel>(entity);
        }

        public async Task<UserViewModel> Edit(UserViewModel model)
        {
            var userEntity = await _userRepo.GetById(model.Id);
            if (userEntity != null)
            {
                userEntity.Name = model.Name;
                userEntity.Email = model.Email;
                userEntity.Status = model.Status;
                userEntity.LanguageId = model.LanguageId;
                userEntity.EnterpriseId = model.EnterpriseId;
                var entity = await _userRepo.Update(userEntity);
                return _mapper.Map<UserViewModel>(entity);
            }
            return null;
        }

        public async Task<List<UserViewModel>> GetAll()
        {
            var list = await _userRepo.GetAll().ToListAsync();
            return _mapper.Map<List<UserViewModel>>(list.ToList());
        }

        public async Task<UserViewModel> Remove(UserViewModel model)
        {
            var entity = await _userRepo.Delete(_mapper.Map<UserEntity>(model));
            return _mapper.Map<UserViewModel>(entity);
        }
        public async Task<UserViewModel> GetByEmailPassword(string email, string password)
        {
            var user = await _userRepo.SingleBy(u => u.Email == email && u.Password == password && u.EmailVerified);
            return _mapper.Map<UserViewModel>(user);
        }
        public async Task<UserViewModel> GetByEmail(string email)
        {
            var user = await _userRepo.SingleBy(u => u.Email == email);
            return _mapper.Map<UserViewModel>(user);
        }
        public async Task<UserViewModel> GetByUserId(string id)
        {
            var user = await _userRepo.SingleBy(u => u.Id == Guid.Parse(id));
            return _mapper.Map<UserViewModel>(user);
        }
        public async Task<List<UserViewModel>> GetUserListByEnterprise(Guid? enterpriseId)
        {
            var users = await _userRepo.FindByAsync(u => u.EnterpriseId == enterpriseId);
            return _mapper.Map<List<UserViewModel>>(users);
        }
        public async Task<UserViewModel> UpdateRefreshToken(UserAuthViewModel model)
        {
            var user = await _userRepo.GetById(model.Id);
            user.RefreshToken = model.RefreshToken;
            await _userRepo.Update(user);
            return model;
        }
    }
}
