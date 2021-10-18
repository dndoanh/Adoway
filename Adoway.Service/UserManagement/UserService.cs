using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.Helpers;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;
using Adoway.Data.Repositories.UserManagement;
using Adoway.Common.ViewModels.Base;
using Microsoft.Data.SqlClient;
using Adoway.Common.Extensions;
using Adoway.Data.Context;
using Adoway.Service.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Adoway.Service.UserManagement
{
    public class UserService : BaseService, IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        private readonly IUserInRoleRepository _userInRoleRepo;
        private readonly IConfiguration _configuration;
        public UserService(IConfiguration configuration, IMapper mapper, IAdowayContext dbContext, IUserRepository userRepo, IUserInRoleRepository userInRoleRepo) : base(dbContext)
        {
            _configuration = configuration;
            _mapper = mapper;
            _userRepo = userRepo;
            _userInRoleRepo = userInRoleRepo;
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
                var entity = await _userRepo.Update(userEntity);
                return _mapper.Map<UserViewModel>(entity);
            }
            return null;
        }

        public async Task<UserViewModel> Remove(Guid id)
        {
            var entity = await _userRepo.Delete(id);
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
        public async Task<List<UserViewModel>> GetUsersByEnterprise(Guid? enterpriseId)
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
        public async Task<ApiResponseViewModel<UserViewModel>> SearchUsers(UserFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<UserViewModel>().FromSqlRaw("EXEC SP_SearchUsers @Name, @Email, @EnterpriseId, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Email", model.Filter.Email),
                SqlParameterHelper.AddNullableGuid("@EnterpriseId", model.Filter.EnterpriseId),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            foreach (var item in result)
            {
                if (!string.IsNullOrEmpty(item.AvatarUrl))
                    item.AvatarUrl = _configuration["Settings:ApiHostUrl"] + item.AvatarUrl;
            }
            return new ApiResponseViewModel<UserViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }

        // users in roles
        public async Task<List<UserInRoleViewModel>> GetUserInRoleList(Guid userId)
        {
            var roles = await _userInRoleRepo.FindByAsync(u => u.UserId == userId);
            return _mapper.Map<List<UserInRoleViewModel>>(roles);
        }

    }
}
