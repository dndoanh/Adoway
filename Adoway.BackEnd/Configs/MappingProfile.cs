using AutoMapper;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.UserManagement;
using Adoway.Common.ViewModels.System;
using Adoway.Data.Entities.System;
using Adoway.Common.ViewModels.Inventory;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Entities.Project;
using Adoway.Common.ViewModels.Project;
using Adoway.Data.Entities.Purchase;
using Adoway.Common.ViewModels.Purchase;
using Adoway.Data.Entities.Sales;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.BackEnd.Configs
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Human Resource

            // Inventory
            CreateMap<CategoryViewModel, CategoryEntity>();
            CreateMap<CategoryEntity, CategoryViewModel>();
            CreateMap<ProductViewModel, ProductEntity>();
            CreateMap<ProductEntity, ProductViewModel>();
            // Project
            CreateMap<ApartmentViewModel, ApartmentEntity>();
            CreateMap<ApartmentEntity, ApartmentViewModel>();
            CreateMap<ProjectViewModel, ProjectEntity>();
            CreateMap<ProjectEntity, ProjectViewModel>();
            CreateMap<OwnerViewModel, OwnerEntity>();
            CreateMap<OwnerEntity, OwnerViewModel>();
            CreateMap<WorkOrderViewModel, WorkOrderEntity>();
            CreateMap<WorkOrderEntity, WorkOrderViewModel>();
            // Purchase
            CreateMap<SupplierViewModel, SupplierEntity>();
            CreateMap<SupplierEntity, SupplierViewModel>();
            // Sales
            CreateMap<CustomerViewModel, CustomerEntity>();
            CreateMap<CustomerEntity, CustomerViewModel>();
            CreateMap<SubscriptionViewModel, SubscriptionEntity>();
            CreateMap<SubscriptionEntity, SubscriptionViewModel>();
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
