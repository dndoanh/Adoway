using System;
using Adoway.Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.System;
using Adoway.Common.ViewModels.System;

namespace Adoway.Data.Context
{
    public class AdowayContext : DbContext, IAdowayContext
    {
        public AdowayContext()
        {
        }
        public AdowayContext(DbContextOptions<AdowayContext> options) : base(options)
        {
        }
        public DbSet<TEntity> DbSet<TEntity>() where TEntity : class
        {
            return this.Set<TEntity>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(local);Database=Adoway;Trusted_Connection=True;");
        }

        // User management
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<RoleEntity> Roles { get; set; }
        public DbSet<UserInRoleEntity> UsersInRoles { get; set; }
        public DbSet<RoleInScreenEntity> RolesInScreens { get; set; }
        public DbSet<RoleInScreenFunctionEntity> RolesInScreenFunctions { get; set; }
        public DbSet<UserVerificationEntity> UserVerifications { get; set; }

        // System
        public DbSet<LanguageEntity> Languages { get; set; }
        public DbSet<SettingEntity> Settings { get; set; }
        public DbSet<EnterpriseEntity> Enterpises { get; set; }
        public DbSet<ScreenEntity> Screens { get; set; }
        public DbSet<ScreenFunctionEntity> ScreenFunctions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // global config for decimal attribute
            var decimalProperties = modelBuilder.Model.GetEntityTypes().SelectMany(t => t.GetProperties())
                                .Where(p => p.ClrType == typeof(decimal) || p.ClrType == typeof(decimal?));
            foreach (var prop in decimalProperties)
            {
                // EF Core 3
                prop.SetColumnType("decimal(18, 6)");
            }
            // global config for guid attribute
            var guidProperties = modelBuilder.Model.GetEntityTypes().SelectMany(t => t.GetProperties())
                                .Where(p => p.ClrType == typeof(Guid) && p.Name.ToUpper() == "ID");
            foreach (var prop in guidProperties)
            {
                prop.SetDefaultValueSql("NEWID()");
            }

            // base entities config
            //modelBuilder.Entity<SettingEntity>().HasIndex(u => u.Key).IsUnique();

            // user management entities config
            modelBuilder.Entity<UserEntity>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<UserVerificationEntity>().HasIndex(u => u.Token).IsUnique();

            // model builder for store procedure
            // base
            modelBuilder.Entity<LanguageViewModel>().HasNoKey().ToTable(null);
            modelBuilder.Entity<EnterpriseViewModel>().HasNoKey().ToTable(null);
            // user management
            modelBuilder.Entity<UserViewModel>().HasNoKey().ToTable(null);
            modelBuilder.Entity<RoleViewModel>().HasNoKey().ToTable(null);

        }
    }
}
