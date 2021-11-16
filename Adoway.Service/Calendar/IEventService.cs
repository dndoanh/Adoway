using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Calendar;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Calendar
{
    public interface IEventService
    {
        Task<EventViewModel> Create(EventViewModel model);
        Task<EventViewModel> Edit(EventViewModel model);
        Task<EventViewModel> Remove(Guid id);
        Task<ApiResponseViewModel<EventViewModel>> SearchEvents(EventFilterViewModel model);
    }
}
