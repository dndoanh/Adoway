using AutoMapper;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;
using Adoway.Common.ViewModels.System;
using Adoway.Data.Entities.System;

namespace Adoway.BackEnd.Configs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // System
            CreateMap<EnterpriseViewModel, EnterpriseEntity>();
            CreateMap<EnterpriseEntity, EnterpriseViewModel>();
            CreateMap<LanguageViewModel, LanguageEntity>();
            CreateMap<LanguageEntity, LanguageViewModel>();
            CreateMap<SettingViewModel, SettingEntity>();
            CreateMap<SettingEntity, SettingViewModel>();

            // User management
            // User
            CreateMap<UserViewModel, UserEntity>();
            CreateMap<UserEntity, UserViewModel>();
            CreateMap<UserInRoleViewModel, UserInRoleEntity>();
            CreateMap<UserInRoleEntity, UserInRoleViewModel>();
            // Role
            CreateMap<UserViewModel, UserAuthViewModel>();
            CreateMap<RoleViewModel, RoleEntity>();
            CreateMap<RoleEntity, RoleViewModel>();
            CreateMap<RoleInScreenViewModel, RoleInScreenEntity>();
            CreateMap<RoleInScreenEntity, RoleInScreenViewModel>();
        }
    }
}
