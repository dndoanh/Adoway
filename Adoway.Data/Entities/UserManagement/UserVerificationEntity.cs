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
		public string Email { get; set; }
		public string Token { get; set; }
		public bool IsForgotPassword { get; set; }
		public DateTime? VerifiedDate { get; set; }
		public DateTime? ExpireDate { get; set; }

		public Guid? UserId { get; set; }
		[ForeignKey("UserId")]
		public UserEntity User { get; set; }
	}
}
