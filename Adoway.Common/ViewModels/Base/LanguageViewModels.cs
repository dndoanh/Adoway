﻿using Adoway.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Adoway.Common.ViewModels.Base
{
    public class LanguageViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Locale { get; set; }
        public Status Status { get; set; }
        public bool IsDefault { get; set; }
    }
    public class LanguageListViewModel
    {
        public List<LanguageViewModel> Items { get; set; }
        public int TotalCount { get; set; }
        public string ErrMsg { get; set; }
    }
}
