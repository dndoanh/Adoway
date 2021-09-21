using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.UserManagement
{
    [Table("Users")]
    public class UserEntity : BaseEntity
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        public bool EmailVerified { get; set; }
        public string AvatarUrl { get; set; }
        public Status Status { get; set; }
        public string RefreshToken { get; set; }

        public Guid? LanguageId { get; set; }
        [ForeignKey("LanguageId")]
        public LanguageEntity Language { get; set; }
        public Guid? EnterpriseId { get; set; }
        [ForeignKey("EnterpriseId")]
        public EnterpriseEntity Enterprise { get; set; }
    }
}
