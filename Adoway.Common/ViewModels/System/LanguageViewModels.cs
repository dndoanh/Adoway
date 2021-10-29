using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using System;

namespace Adoway.Common.ViewModels.System
{
    public class LanguageViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Locale { get; set; }
        public Status Status { get; set; }
        public bool IsDefault { get; set; }
    }
    public class LanguageFilterViewModel : BaseFilterViewModel
    {
        public LanguageFilter Filter { get; set; }
    }
    public class LanguageFilter
    {
        public string Name { get; set; }
        public string Locale { get; set; }
        public Status? Status { get; set; }
    }
}
