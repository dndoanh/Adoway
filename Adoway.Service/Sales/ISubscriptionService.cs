using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Sales
{
    public interface ISubscriptionService
    {
        Task<SubscriptionViewModel> Create(SubscriptionViewModel model);
        Task<SubscriptionViewModel> Edit(SubscriptionViewModel model);
        Task<SubscriptionViewModel> Remove(Guid id);
        Task<ApiResponseViewModel<SubscriptionViewModel>> SearchSubscriptions(SubscriptionFilterViewModel model);
    }
}
