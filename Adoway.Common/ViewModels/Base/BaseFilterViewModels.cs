using Adoway.Common.Enums;
using System;

namespace Adoway.Common.ViewModels.Base
{
    public class BaseFilterViewModel
    {
        public SortOrder SortOrder { get; set; }
        public string SortField { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
    public class BaseEnterpriseFilter
    {
        public Guid EnterpriseId { get; set; }
    }
}
