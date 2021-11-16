using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Sales;

namespace Adoway.Service.Sales
{
    public interface IInvoiceService
    {
        Task<InvoiceViewModel> Create(InvoiceViewModel model);
        Task<InvoiceViewModel> Edit(InvoiceViewModel model);
        Task<InvoiceViewModel> Remove(Guid id);
        Task<ApiResponseViewModel<InvoiceViewModel>> SearchInvoices(InvoiceFilterViewModel model);
    }
}
