using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Sales
{
    public interface ISubscriptionPaymentService
    {
        Task<SubscriptionPaymentImportViewModel> Create(SubscriptionPaymentImportViewModel model);
        Task<SubscriptionPaymentImportViewModel> Edit(SubscriptionPaymentImportViewModel model);
        Task<SubscriptionPaymentViewModel> Remove(Guid id);
        Task<ApiResponseViewModel<SubscriptionPaymentViewModel>> SearchSubscriptions(SubscriptionPaymentFilterViewModel model);
        Task<SubscriptionPaymentViewModel> FindSubPayments(Guid SubsId, DateTime PaymentDate);
        Task<List<SubscriptionPaymentViewModel>> SearchSubPayments(List<SubscriptionViewModel> model);
    }
}
