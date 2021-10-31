using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Project
{
    public class OwnerViewModel : BaseEnterpriseViewModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public Status Status { get; set; }
    }
    public class OwnerFilterViewModel : BaseFilterViewModel
    {
        public OwnerFilter Filter { get; set; }
    }
    public class OwnerFilter : BaseEnterpriseFilter
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public Status? Status { get; set; }
    }
}
