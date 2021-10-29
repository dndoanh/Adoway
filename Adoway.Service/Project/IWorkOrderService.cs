using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.Project;

namespace Adoway.Service.Project
{
    public interface IWorkOrderService
    {
        Task<WorkOrderViewModel> Create(WorkOrderViewModel model);
        Task<WorkOrderViewModel> Edit(WorkOrderViewModel model);
        Task<WorkOrderViewModel> Remove(Guid id);
        Task<ApiResponseViewModel<WorkOrderViewModel>> SearchWorkOrders(WorkOrderFilterViewModel model);
    }
}
