using System;
using System.Collections.Generic;
using System.Text;

namespace Adoway.Common.Enums
{
    public enum RequestStatus
    {
        Requesting = 1,
        Confirmed = 2,
        Collected = 3,
        Finished = 4,
        Cancelled = -1,
    }
}
