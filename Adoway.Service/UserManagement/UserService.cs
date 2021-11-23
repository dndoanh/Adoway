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
using Adoway.Common.ViewModels.System;

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
                if (model.AvatarChanged)
                    userEntity.AvatarUrl = model.AvatarUrl;
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
        public async Task<List<UserInRoleViewModel>> GetUserInRoles(Guid userId)
        {
            var roles = await (from a in DbContext.Roles
                               join b in DbContext.UsersInRoles on a.Id equals b.RoleId
                               where b.UserId == userId
                               orderby a.Name
                               select new UserInRoleViewModel
                               {
                                   Id = b.Id,
                                   RoleId = a.Id,
                                   RoleName = a.Name,
                                   Description = a.Description,
                                   UserId = b.UserId
                               }).ToListAsync();
            return roles;
        }
        public async Task<UserInRoleViewModel> CreateUserInRole(UserInRoleViewModel model)
        {
            var userInRoleEntity = _mapper.Map<UserInRoleEntity>(model);
            var entity = await _userInRoleRepo.Insert(userInRoleEntity);
            return _mapper.Map<UserInRoleViewModel>(entity);
        }
        public async Task<UserInRoleViewModel> RemoveUserInRole(Guid id)
        {
            var entity = await _userInRoleRepo.Delete(id);
            return _mapper.Map<UserInRoleViewModel>(entity);
        }
        public async Task<List<ScreenViewModel>> GetUserScreens(Guid userId)
        {
            var screens = await (from a in DbContext.Roles
                                 join b in DbContext.UsersInRoles on a.Id equals b.RoleId
                                 join c in DbContext.RolesInScreens on a.Id equals c.RoleId
                                 join d in DbContext.Screens on c.ScreenId equals d.Id
                                 where b.UserId == userId
                                 orderby d.Ord
                                 select new ScreenViewModel
                                 {
                                     Name = d.Name,
                                     Path = d.Path,
                                     Icon = d.Icon,
                                     IsUpper = d.IsUpper
                                 }).Distinct().ToListAsync();
            return screens;
        }
        public async Task<List<ScreenFunctionViewModel>> GetUserFunctions(Guid userId)
        {
            var functions = await (from a in DbContext.ScreenFunctions
                               join b in DbContext.RolesInScreenFunctions on a.Id equals b.ScreenFunctionId
                               join c in DbContext.Roles on b.RoleId equals c.Id
                               join d in DbContext.UsersInRoles on c.Id equals d.RoleId
                               where d.UserId == userId && b.BelongTo
                               select new ScreenFunctionViewModel
                               {
                                   Code = a.Code,
                                   Name = a.Name
                               }).Distinct().ToListAsync();
            return functions;
        }
    }
}
