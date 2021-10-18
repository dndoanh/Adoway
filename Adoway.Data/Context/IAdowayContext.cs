using System.Threading;
using System.Threading.Tasks;
using Adoway.Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Adoway.Data.Entities.System;

namespace Adoway.Data.Context
{
    public interface IAdowayContext
    {
        DatabaseFacade Database { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        DbSet<TEntity> DbSet<TEntity>() where TEntity : class;
        
        // User management
        DbSet<UserEntity> Users { get; set; }
        DbSet<RoleEntity> Roles { get; set; }
        DbSet<UserInRoleEntity> UsersInRoles { get; set; }
        DbSet<RoleInScreenEntity> RolesInScreens { get; set; }
        DbSet<RoleInScreenFunctionEntity> RolesInScreenFunctions { get; set; }
        DbSet<UserVerificationEntity> UserVerifications { get; set; }

        // System
        DbSet<LanguageEntity> Languages { get; set; }
        DbSet<EnterpriseEntity> Enterpises { get; set; }
        DbSet<ScreenEntity> Screens { get; set; }
        DbSet<ScreenFunctionEntity> ScreenFunctions { get; set; }
        DbSet<SettingEntity> Settings { get; set; }
    }
}
