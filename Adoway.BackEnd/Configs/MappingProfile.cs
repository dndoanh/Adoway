using AutoMapper;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.UserManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Adoway.BackEnd.Configs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Base
            CreateMap<LanguageViewModel, LanguageEntity>();
            CreateMap<LanguageEntity, LanguageViewModel>();
            CreateMap<SettingViewModel, SettingEntity>();
            CreateMap<SettingEntity, SettingViewModel>();

            // User management
            CreateMap<UserViewModel, UserEntity>();
            CreateMap<UserEntity, UserViewModel>();
            CreateMap<UserViewModel, UserAuthViewModel>();
        }
    }
}
