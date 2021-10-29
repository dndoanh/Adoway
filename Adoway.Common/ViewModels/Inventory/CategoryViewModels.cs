using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;

namespace Adoway.Common.ViewModels.Inventory
{
    public class CategoryViewModel : BaseEnterpriseViewModel
    {
        public Guid? ParentId { get; set; }
        public string ParentName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class CategoryFilterViewModel : BaseFilterViewModel
    {
        public CategoryFilter Filter { get; set; }
    }
    public class CategoryFilter : BaseEnterpriseFilter
    {
        public string Name { get; set; }
        public string ParentName { get; set; }
        public string Description { get; set; }
    }
}
