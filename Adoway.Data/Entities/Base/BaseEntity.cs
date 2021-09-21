using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adoway.Data.Entities.Base
{
    public abstract class BaseEntity : ICloneable
    {
        [Key]
        public Guid Id { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public bool IsDeleted { get; set; }
        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }
}
