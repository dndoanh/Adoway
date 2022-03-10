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
        Task<SubscriptionViewModel> FindByContractCode(string ContractCode);
        Task<ApiResponseViewModel<SubscriptionViewModel>> SearchSubscriptions(SubscriptionFilterViewModel model);
        Task<List<SubscriptionViewModel>> Import(SubscriptionImportViewModel model, string Supplier);
        Task<byte[]> Export(List<SubscriptionPaymentViewModel> model,string path);
        Task<List<SubscriptionViewModel>> FindSubs(SubscriptionExportViewModel model);

    }
}
