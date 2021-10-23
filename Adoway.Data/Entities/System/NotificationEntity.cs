using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.UserManagement;

namespace Adoway.Data.Entities.System
{
    [Table("Notifications")]
    public class NotificationEntity : BaseEntity
    {
        public NotificationType NotificationType { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public string ExtraInfo { get; set; }
        public bool IsRead { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public UserEntity User { get; set; }
    }
}
