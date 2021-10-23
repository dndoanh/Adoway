using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;

namespace Adoway.Data.Entities.HumanResource
{
    public class EmployeeEntity  : BaseEnterpriseEntity
    {
        [Required]
        public string Name { get; set; }
        public string MobilePhone { get; set; }
        public string WorkEmail { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }
        public Guid? ManagerId { get; set; }
        public Guid? DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public DepartmentEntity Department { get; set; }
    }
}
