using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Project
{
    public class ProjectViewModel : BaseEnterpriseViewModel
    {
        public Guid OwnerId { get; set; }
        public string OwnerName { get; set; }
        public Guid? SalesUserId { get; set; }
        public string SalesName { get; set; }
        public Guid? TechUserId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime? ActiveDate { get; set; }
        public DateTime? BeginDate { get; set; }
        public int BlockCount { get; set; }
        public int FloorCount { get; set; }
        public int BasementCount { get; set; }
        public int SquareCount { get; set; }
        public int PortCount { get; set; }
        public int ApartmentCount { get; set; }
        public string Description { get; set; }
        public ProjectType ProjectType { get; set; }
        public AreaType AreaType { get; set; }
        public ProjectStatus Status { get; set; }
    }
    public class ProjectFilterViewModel : BaseFilterViewModel
    {
        public ProjectFilter Filter { get; set; }
    }
    public class ProjectFilter : BaseEnterpriseFilter
    {
        public string OwnerName { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string SalesName { get; set; }
        public Guid? OwnerId { get; set; }
        public ProjectType? ProjectType { get; set; }
        public AreaType? AreaType { get; set; }
        public ProjectStatus? Status { get; set; }
    }
}
