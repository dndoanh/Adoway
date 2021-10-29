using Adoway.Common.ViewModels.Base;
using System;

namespace Adoway.Common.ViewModels.Project
{
    public class ApartmentViewModel : BaseEnterpriseViewModel
    {
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; }
        public Guid? OwnerId { get; set; }
        public string OwnerName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Floor { get; set; }
        public string Block { get; set; }
        public string InternetLine { get; set; }
        public string TvLine { get; set; }
    }
    public class ApartmentFilterViewModel : BaseFilterViewModel
    {
        public ApartmentFilter Filter { get; set; }
    }
    public class ApartmentFilter : BaseEnterpriseFilter
    {
        public string ProjectName { get; set; }
        public string OwnerName { get; set; }
        public string Name { get; set; }
        public string Floor { get; set; }
        public string Block { get; set; }
        public string InternetLine { get; set; }
        public string TvLine { get; set; }
        public Guid? ProjectId { get; set; }
    }
}
