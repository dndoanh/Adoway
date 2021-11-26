using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Common.ViewModels.System
{
    public class ScreenViewModel
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public string Icon { get; set; }
        public bool IsUpper { get; set; }
        public string Ord { get; set; }
    }
    public class ScreenFunctionViewModel
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
