using Adoway.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adoway.Service.Base
{
    public abstract class BaseService
    {
        protected readonly IAdowayContext DbContext;
        protected BaseService(IAdowayContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
