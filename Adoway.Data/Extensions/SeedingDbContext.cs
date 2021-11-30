using Adoway.Common.Constants;
using Adoway.Common.Helpers;
using Adoway.Data.Context;
using Adoway.Data.Entities.System;
using Adoway.Data.Entities.UserManagement;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adoway.Data.Extensions
{
    public static class SeedingDbContext
    {
        public static void EnsureSeedDataForContext(this IAdowayContext context)
        {
            // seed screens
            if (!context.Screens.Any())
            {
                var calendar = new ScreenEntity
                {
                    Name = "Calendar",
                    Ord = "AAA",
                    IsUpper = true
                };
                context.Screens.Add(calendar);
                var eventScreen = new ScreenEntity
                {
                    Name = "Event",
                    Ord = "AAB",
                    Path = "/events",
                    Icon = "/media/svg/icons/Code/Time-schedule.svg",
                    IsUpper = false
                };
                var meetingRoom = new ScreenEntity
                {
                    Name = "Meeting Rooms",
                    Ord = "AAC",
                    Path = "/meeting-rooms",
                    Icon = "/media/svg/icons/Home/Door-open.svg",
                    IsUpper = false
                };

                var inventory = new ScreenEntity
                {
                    Name = "Inventory",
                    Ord = "BAA",
                    IsUpper = true
                };
                var category = new ScreenEntity
                {
                    Name = "Product Category",
                    Ord = "BAB",
                    Path = "/categories",
                    Icon = "/media/svg/icons/Home/Commode1.svg",
                    IsUpper = false
                };
                var product = new ScreenEntity
                {
                    Name = "Product",
                    Ord = "BAC",
                    Path = "/products",
                    Icon = "/media/svg/icons/Shopping/Box2.svg",
                    IsUpper = false
                };

                var payment = new ScreenEntity
                {
                    Name = "Payment",
                    Ord = "CAA",
                    IsUpper = true
                };
                var paymentRequest = new ScreenEntity
                {
                    Name = "Payment Request",
                    Ord = "CAB",
                    Path = "/payment-requests",
                    Icon = "/media/svg/icons/Home/Bulb1.svg",
                    IsUpper = false
                };

                var projectUpper = new ScreenEntity
                {
                    Name = "Project",
                    Ord = "DAA",
                    IsUpper = true
                };
                var workOrder = new ScreenEntity
                {
                    Name = "Work Order",
                    Ord = "DAB",
                    Path = "/work-orders",
                    Icon = "/media/svg/icons/Shopping/Ticket.svg",
                    IsUpper = false
                };
                var project = new ScreenEntity
                {
                    Name = "Project",
                    Ord = "DAC",
                    Path = "/projects",
                    Icon = "/media/svg/icons/Design/Layers.svg",
                    IsUpper = false
                };
                var apartment = new ScreenEntity
                {
                    Name = "Apartment",
                    Ord = "DAD",
                    Path = "/apartments",
                    Icon = "/media/svg/icons/Home/Home-heart.svg",
                    IsUpper = false
                };
                var owner = new ScreenEntity
                {
                    Name = "Owner",
                    Ord = "DAE",
                    Path = "/owners",
                    Icon = "/media/svg/icons/Design/Sketch.svg",
                    IsUpper = false
                };

                var purchase = new ScreenEntity
                {
                    Name = "Purchase",
                    Ord = "EAA",
                    IsUpper = true
                };
                var supplier = new ScreenEntity
                {
                    Name = "Supplier",
                    Ord = "EAB",
                    Path = "/suppliers",
                    Icon = "/media/svg/icons/Shopping/Box1.svg",
                    IsUpper = false
                };
                var sales = new ScreenEntity
                {
                    Name = "Sales",
                    Ord = "FAA",
                    IsUpper = true
                };
                var subscription = new ScreenEntity
                {
                    Name = "Susbscription",
                    Ord = "FAB",
                    Path = "/subscriptions",
                    Icon = "/media/svg/icons/Devices/Server.svg",
                    IsUpper = false
                };
                var invoice = new ScreenEntity
                {
                    Name = "Invoice",
                    Ord = "FAB",
                    Path = "/invoices",
                    Icon = "/media/svg/icons/Shopping/Bag1.svg",
                    IsUpper = false
                };
                var customer = new ScreenEntity
                {
                    Name = "Customer",
                    Ord = "FAB",
                    Path = "/customers",
                    Icon = "/media/svg/icons/Shopping/Sale1.svg",
                    IsUpper = false
                };
                var userManagement = new ScreenEntity
                {
                    Name = "User Management",
                    Ord = "GAA",
                    IsUpper = true
                };
                var user = new ScreenEntity
                {
                    Name = "User",
                    Ord = "GAB",
                    Path = "/users",
                    Icon = "/media/svg/icons/General/User.svg",
                    IsUpper = false
                };
                var role = new ScreenEntity
                {
                    Name = "Role",
                    Ord = "GAC",
                    Path = "/roles",
                    Icon = "/media/svg/icons/General/Size.svg",
                    IsUpper = false
                };
                context.Screens.AddRange(new ScreenEntity[] { calendar, eventScreen, meetingRoom, inventory, category, product, payment, paymentRequest, projectUpper,
                    workOrder, project, apartment, owner, purchase, supplier, sales, subscription, invoice, customer, userManagement, user, role });
                context.SaveChanges();
                context.ScreenFunctions.AddRange(
                     new List<ScreenFunctionEntity>
                    {
                         new ScreenFunctionEntity{Code=ScreenFunctions.EVENT_ADD_EVENT, Name="Add Event", ScreenId=eventScreen.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.EVENT_EDIT_EVENT, Name="Edit Event", ScreenId=eventScreen.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.EVENT_DELETE_EVENT, Name="Delete Event", ScreenId=eventScreen.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.MEETING_ROOM_ADD_MEETING_ROOM, Name="Add Meeting Room", ScreenId=meetingRoom.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.MEETING_ROOM_EDIT_MEETING_ROOM, Name="Edit Meeting Room", ScreenId=meetingRoom.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.MEETING_ROOM_DELETE_MEETING_ROOM, Name="Delete Meeting Room", ScreenId=meetingRoom.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.CATEGORY_ADD_CATEGORY, Name="Add Product Category", ScreenId=category.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.CATEGORY_EDIT_CATEGORY, Name="Edit Product Category", ScreenId=category.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.CATEGORY_DELETE_CATEGORY, Name="Delete Product Category", ScreenId=category.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PRODUCT_ADD_PRODUCT, Name="Add Product", ScreenId=product.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PRODUCT_EDIT_PRODUCT, Name="Edit Product", ScreenId=product.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PRODUCT_DELETE_PRODUCT, Name="Delete Product", ScreenId=product.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_ADD_PAYMENT_REQUEST, Name="Add Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_EDIT_PAYMENT_REQUEST, Name="Edit Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_DELETE_PAYMENT_REQUEST, Name="Delete Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_CONFIRM_PAYMENT_REQUEST, Name="Confirm Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_VERIFY_PAYMENT_REQUEST, Name="Verify Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_PAYING_PAYMENT_REQUEST, Name="Paying Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_DONE_PAYMENT_REQUEST, Name="Done Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PAYMENT_REQUEST_CANCEL_PAYMENT_REQUEST, Name="Cancel Payment Request", ScreenId=paymentRequest.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_ADD_WORK_ORDER, Name="Add Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_EDIT_WORK_ORDER, Name="Edit Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_DELETE_WORK_ORDER, Name="Delete Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_PASS_WORK_ORDER, Name="Add Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_START_WORK_ORDER, Name="Edit Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_FINISH_WORK_ORDER, Name="Finish Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_RETURN_WORK_ORDER, Name="Return Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.WORK_ORDER_SUSPEND_WORK_ORDER, Name="Suspend Work Order", ScreenId=workOrder.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PROJECT_ADD_PROJECT, Name="Add Project", ScreenId=project.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PROJECT_EDIT_PROJECT, Name="Edit Project", ScreenId=project.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.PROJECT_DELETE_PROJECT, Name="Delete Project", ScreenId=project.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.APARTMENT_ADD_APARTMENT, Name="Add Apartment", ScreenId=project.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.APARTMENT_EDIT_APARTMENT, Name="Edit Apartment", ScreenId=project.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.APARTMENT_DELETE_APARTMENT, Name="Delete Apartment", ScreenId=project.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.OWNER_ADD_OWNER, Name="Add Owner", ScreenId=owner.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.OWNER_EDIT_OWNER, Name="Edit Owner", ScreenId=owner.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.OWNER_DELETE_OWNER, Name="Delete Owner", ScreenId=owner.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.SUPPLIER_ADD_SUPPLIER, Name="Add Supplier", ScreenId=supplier.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.SUPPLIER_EDIT_SUPPLIER, Name="Edit Supplier", ScreenId=supplier.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.SUPPLIER_DELETE_SUPPLIER, Name="Delete Supplier", ScreenId=supplier.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.SUBSCRIPTION_ADD_SUBSCRIPTION, Name="Add Subscription", ScreenId=subscription.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.SUBSCRIPTION_EDIT_SUBSCRIPTION, Name="Edit Subscription", ScreenId=subscription.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.SUBSCRIPTION_DELETE_SUBSCRIPTION, Name="Delete Subscription", ScreenId=subscription.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.INVOICE_ADD_INVOICE, Name="Add Invoice", ScreenId=invoice.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.INVOICE_EDIT_INVOICE, Name="Edit Invoice", ScreenId=invoice.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.INVOICE_DELETE_INVOICE, Name="Delete Invoice", ScreenId=invoice.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.CUSTOMER_ADD_CUSTOMER, Name="Add Customer", ScreenId=customer.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.CUSTOMER_EDIT_CUSTOMER, Name="Edit Customer", ScreenId=customer.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.CUSTOMER_DELETE_CUSTOMER, Name="Delete Customer", ScreenId=customer.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.USER_ADD_USER, Name="Add User", ScreenId=user.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.USER_EDIT_USER, Name="Edit User", ScreenId=user.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.USER_DELETE_USER, Name="Delete User", ScreenId=user.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.USER_IN_ROLE, Name="User In Roles", ScreenId=user.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.ROLE_ADD_ROLE, Name="Add Role", ScreenId=role.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.ROLE_EDIT_ROLE, Name="Edit Role", ScreenId=role.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.ROLE_DELETE_ROLE, Name="Delete Role", ScreenId=role.Id},
                         new ScreenFunctionEntity{Code=ScreenFunctions.ROLE_IN_SCREEN, Name="Role In Screens", ScreenId=role.Id},
                    }
                    );
            }

            if (!context.Languages.Any())
            {
                // seed languages
                context.Languages.AddRange(
                    new List<LanguageEntity>
                    { new LanguageEntity
                    {
                        Id = Guid.NewGuid(),
                        Name = "English",
                        Locale = "en_US",
                        Status = Common.Enums.Status.Active
                    },
                    new LanguageEntity {
                        Id = Guid.NewGuid(),
                        Name = "Tiếng Việt",
                        Locale = "vi_VN",
                        IsDefault = true,
                        Status = Common.Enums.Status.Active
                    }
                    });
            }

            // seed enterprises;
            if (!context.Enterpises.Any())
            {
                context.Enterpises.Add(new EnterpriseEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "Cty CPDV Bồ Câu",
                    Email = "info@bocau.com.vn",
                    Phone = "0912345678",
                    Status = Common.Enums.Status.Active
                });
            }

            // seed users
            if (!context.Users.Any())
            {
                context.Users.Add(new UserEntity
                {
                    Id = Guid.NewGuid(),
                    Name = "System Admin",
                    Email = "admin@adoway.com",
                    IsSuperAdmin = true,
                    Status = Common.Enums.Status.Active,
                    Password = SecurityHelper.SHA1Hash("123456")
                });
            }

            // save changes
            context.SaveChanges();
        }
    }
}
