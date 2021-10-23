using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Common.Enums
{
    public enum WorkOrderStatus
    {
        Draft = 1,
        Passed = 2,
        InProgress = 3,
        Finished =4,
        Done=5,
        Pending=6,
        Suspended=7,
        Returned=8
    }
    public enum WorkOrderType
    {
        LM=1,
        SC=2,
        DD=3,
        KS=4,
        HT=5,
        TC=6
    }
    public enum WorkOrderCategory
    {
        Internet=1,
        CableTVNetwork=2,

    }
}
