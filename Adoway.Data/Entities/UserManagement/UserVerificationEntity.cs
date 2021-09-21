using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.UserManagement
{
	[Table("UserVerifications")]
	public class UserVerificationEntity : BaseEntity
	{
		public Guid? UserId { get; set; }
		public string EmailPhone { get; set; }
		public string Token { get; set; }
		public bool IsEmail { get; set; }
		public DateTime? VerifiedDate { get; set; }
		public DateTime? ExpireDate { get; set; }

		[ForeignKey("UserId")]
		public UserEntity User { get; set; }
	}
}
