using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Common.ViewModels.Base
{
    public class ApiResponseViewModel<T> where T: class
    {
        public int TotalCount { get; set; }
        public List<T> Entities { get; set; }
    }
}
