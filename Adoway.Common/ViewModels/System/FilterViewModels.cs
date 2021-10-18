using Adoway.Common.Enums;

namespace Adoway.Common.ViewModels.System
{
    public class BaseFilterViewModel
    {
        public SortOrder SortOrder { get; set; }
        public string SortField { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
