using Adoway.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Adoway.Common.ViewModels.Base
{
    public class EnterpriseViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }
    }
    public class EnterpriseListViewModel
    {
        public List<EnterpriseViewModel> Items { get; set; }
        public int TotalCount { get; set; }
        public string ErrMsg { get; set; }
    }
}
