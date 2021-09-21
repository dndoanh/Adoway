using System;
using System.Threading;
using System.Threading.Tasks;
using Adoway.Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Context
{
    public interface IAdowayContext
    {
        DatabaseFacade Database { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        DbSet<TEntity> DbSet<TEntity>() where TEntity : BaseEntity;
        // Base
        DbSet<LanguageEntity> Languages { get; set; }
        DbSet<SettingEntity> Settings { get; set; }
        // User management
        DbSet<UserEntity> Users { get; set; }
        DbSet<UserVerificationEntity> UserVerifications { get; set; }
    }
}
