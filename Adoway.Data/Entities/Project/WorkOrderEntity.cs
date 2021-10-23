using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Adoway.Common.Enums;
using Adoway.Data.Entities.Base;
using Adoway.Data.Entities.Sales;
using Adoway.Data.Entities.UserManagement;

namespace Adoway.Data.Entities.Project
{
    public class WorkOrderEntity : BaseEnterpriseEntity
    {
        public WorkOrderType WorkOrderType { get; set; }
        public WorkOrderCategory WorkOrderCategory { get; set; }
        [Required]
        public string Code { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public WorkOrderStatus Status { get; set; }

        // customer
        public Guid? CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public CustomerEntity Customer { get; set; }
        // requester
        public Guid RequesterId { get; set; }
        [ForeignKey("RequesterId")]
        public UserEntity Requester { get; set; }
        // salesman
        public Guid? SalesmanId { get; set; }
        [ForeignKey("SalesmanId")]
        public UserEntity Salesman { get; set; }
        // apartment
        public Guid? ApartmentId { get; set; }
        [ForeignKey("ApartmentId")]
        public ApartmentEntity Apartment { get; set; }
        // project
        public Guid ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public ProjectEntity Project { get; set; }
    }
}
