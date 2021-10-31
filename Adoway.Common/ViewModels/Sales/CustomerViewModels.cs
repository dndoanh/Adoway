using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.Sales
{
    public class CustomerViewModel : BaseEnterpriseViewModel
    {
        public CustomerType CustomerType { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }
    }
    public class CustomerFilterViewModel : BaseFilterViewModel
    {
        public CustomerFilter Filter { get; set; }
    }
    public class CustomerFilter : BaseEnterpriseFilter
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public CustomerType? CustomerType { get; set; }
        public Status? Status { get; set; }
    }
}
