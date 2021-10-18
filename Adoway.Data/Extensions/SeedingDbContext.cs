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
            if (context.Users.Any())
            {
                return;
            }

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
            // seed enterprises;
            context.Enterpises.Add(new EnterpriseEntity
            {
                Id = Guid.NewGuid(),
                Name = "Cty CPDV Bồ Câu",
                Email = "info@bocau.com.vn",
                Phone = "0912345678",
                Status = Common.Enums.Status.Active
            });
            // seed users
            context.Users.Add(new UserEntity
            {
                Id = Guid.NewGuid(),
                Name = "System Admin",
                Email = "admin@adoway.com",
                IsSuperAdmin = true,
                Status = Common.Enums.Status.Active,
                Password = SecurityHelper.SHA1Hash("123456")
            });
            // save changes
            context.SaveChanges();
        }
    }
}
