using System;
using Adoway.Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Adoway.Data.Entities.Base;
using Microsoft.Extensions.Configuration;
using System.IO;
using Adoway.Common.Helpers;

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

        public DbSet<TEntity> DbSet<TEntity>() where TEntity : BaseEntity
        {
            return this.Set<TEntity>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(local)\SQLSERVER;Database=Adoway;Trusted_Connection=True;");
        }
        // Base
        public DbSet<LanguageEntity> Languages { get; set; }
        public DbSet<SettingEntity> Settings { get; set; }
        // User management
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserVerificationEntity> UserVerifications { get; set; }

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
            modelBuilder.Entity<SettingEntity>().HasIndex(u => u.Key).IsUnique();

            // user management entities config
            modelBuilder.Entity<UserEntity>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<UserVerificationEntity>().HasIndex(u => u.Token).IsUnique();

            // seed data
            modelBuilder.Entity<LanguageEntity>().HasData(
                new LanguageEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "English",
                    Locale = "en_US",
                    Status = Common.Enums.Status.Inactive
                },
                new LanguageEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "Tiếng Việt",
                    Locale = "vi_VN",
                    IsDefault = true,
                    Status = Common.Enums.Status.Active
                });
            modelBuilder.Entity<UserEntity>().HasData(
                new UserEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "System Admin",
                    Email = "admin@ecc.vn",
                    Status = Common.Enums.Status.Active,
                    Password=SecurityHelper.SHA1Hash("123456")
                });
        }
    }
}
