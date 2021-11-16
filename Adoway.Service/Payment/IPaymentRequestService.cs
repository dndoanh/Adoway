using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Payment;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Payment
{
    public interface IPaymentRequestService
    {
        Task<PaymentRequestViewModel> Create(PaymentRequestViewModel model);
        Task<PaymentRequestViewModel> Edit(PaymentRequestViewModel model);
        Task<PaymentRequestViewModel> Remove(Guid id);
        Task<ApiResponseViewModel<PaymentRequestViewModel>> SearchPaymentRequests(PaymentRequestFilterViewModel model);
    }
}
