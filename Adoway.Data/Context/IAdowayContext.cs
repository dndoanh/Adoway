using System.Threading;
using System.Threading.Tasks;
using Adoway.Data.Entities.UserManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Adoway.Data.Entities.System;
using Adoway.Data.Entities.Inventory;
using Adoway.Data.Entities.Project;
using Adoway.Data.Entities.Purchase;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Entities.Calendar;
using Adoway.Data.Entities.Payment;

namespace Adoway.Data.Context
{
    public interface IAdowayContext
    {
        DatabaseFacade Database { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        DbSet<TEntity> DbSet<TEntity>() where TEntity : class;

        // Calendar
        DbSet<EventEntity> Events { get; set; }
        DbSet<EventAttendeeEntity> EventAttendees { get; set; }
        DbSet<MeetingRoomEntity> MeetingRooms { get; set; }
        // Inventory
        DbSet<CategoryEntity> Categories { get; set; }
        DbSet<ProductEntity> Products { get; set; }
        // Project
        DbSet<ApartmentEntity> Apartments { get; set; }
        DbSet<ProjectEntity> Projects { get; set; }
        DbSet<OwnerEntity> Owners { get; set; }
        DbSet<WorkOrderEntity> WorkOrders { get; set; }
        // Purchase
        DbSet<SupplierEntity> Suppliers { get; set; }
        // Sales
        DbSet<CustomerEntity> Customers { get; set; }
        DbSet<SubscriptionEntity> Subscriptions { get; set; }
        DbSet<SubscriptionPaymentEntity> SubscriptionPayments { get; set; }
        DbSet<InvoiceEntity> Invoices { get; set; }
        // Payment
        DbSet<PaymentRequestEntity> PaymentRequests { get; set; }
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
