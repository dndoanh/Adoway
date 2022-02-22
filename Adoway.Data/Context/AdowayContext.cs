using System;
using Adoway.Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Data.Entities.System;
using Adoway.Common.ViewModels.System;
using Microsoft.Extensions.Configuration;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Entities.Purchase;
using Adoway.Data.Entities.Project;
using Adoway.Common.ViewModels.Sales;
using Adoway.Common.ViewModels.Purchase;
using Adoway.Common.ViewModels.Project;
using Adoway.Common.ViewModels.Inventory;
using Adoway.Data.Entities.Payment;
using Adoway.Data.Entities.Calendar;
using Adoway.Common.ViewModels.Calendar;
using Adoway.Common.ViewModels.Payment;

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
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                          .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                          .AddJsonFile("appsettings.json")
                          .Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("AdowayConnection"));
            }
        }

        // Calendar
        public DbSet<EventEntity> Events { get; set; }
        public DbSet<EventAttendeeEntity> EventAttendees { get; set; }
        public DbSet<MeetingRoomEntity> MeetingRooms { get; set; }

        // Inventory
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        // Project
        public DbSet<ApartmentEntity> Apartments { get; set; }
        public DbSet<ProjectEntity> Projects { get; set; }
        public DbSet<OwnerEntity> Owners { get; set; }
        public DbSet<WorkOrderEntity> WorkOrders { get; set; }
        // Purchase
        public DbSet<SupplierEntity> Suppliers { get; set; }
        // Sales
        public DbSet<CustomerEntity> Customers { get; set; }
        public DbSet<SubscriptionEntity> Subscriptions { get; set; }
        public DbSet<SubscriptionPaymentEntity> SubscriptionPayments { get; set; }
        public DbSet<InvoiceEntity> Invoices { get; set; }
        // Payment
        public DbSet<PaymentRequestEntity> PaymentRequests { get; set; }
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
            // calendar
            modelBuilder.Entity<MeetingRoomViewModel>().HasNoKey().ToView("MeetingRoomViewModel");
            modelBuilder.Entity<EventViewModel>().HasNoKey().ToView("EventViewModel");
            // inventory
            modelBuilder.Entity<CategoryViewModel>().HasNoKey().ToView("CategoryViewModel");
            modelBuilder.Entity<ProductViewModel>().HasNoKey().ToView("ProductViewModel");
            // project
            modelBuilder.Entity<ApartmentViewModel>().HasNoKey().ToView("ApartmentViewModel");
            modelBuilder.Entity<OwnerViewModel>().HasNoKey().ToView("OwnerViewModel");
            modelBuilder.Entity<ProjectViewModel>().HasNoKey().ToView("ProjectViewModel");
            modelBuilder.Entity<WorkOrderViewModel>().HasNoKey().ToView("WorkOrderViewModel");
            // purchase
            modelBuilder.Entity<SupplierViewModel>().HasNoKey().ToView("SupplierViewModel");
            // sales
            modelBuilder.Entity<CustomerViewModel>().HasNoKey().ToView("CustomerViewModel");
            modelBuilder.Entity<SubscriptionViewModel>().HasNoKey().ToView("SubscriptionViewModel");
            modelBuilder.Entity<SubscriptionPaymentViewModel>().HasNoKey().ToView("SubscriptionPaymentViewModel");
            modelBuilder.Entity<InvoiceViewModel>().HasNoKey().ToView("InvoiceViewModel");
            // payment
            modelBuilder.Entity<PaymentRequestViewModel>().HasNoKey().ToView("PaymentRequestViewModel");
            // system 
            modelBuilder.Entity<LanguageViewModel>().HasNoKey().ToView("LanguageViewModel");
            modelBuilder.Entity<EnterpriseViewModel>().HasNoKey().ToView("EnterpriseViewModel");
            // user management
            modelBuilder.Entity<UserViewModel>().HasNoKey().ToView("UserViewModel");
            modelBuilder.Entity<RoleViewModel>().HasNoKey().ToView("RoleViewModel");
        }
    }
}
