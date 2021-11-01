using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.Project;
using Adoway.Common.ViewModels.Project;

namespace Adoway.BackEnd.Controllers.Project
{
    public class WorkOrderController : ApiBaseController
    {
        private readonly IWorkOrderService _workOrderService;
        public WorkOrderController(IWebHostEnvironment webHostEnvironment, IWorkOrderService workOrderService) : base(webHostEnvironment)
        {
            _workOrderService = workOrderService;
        }
        [HttpPost]
        public async Task<IActionResult> SearchWorkOrders([FromBody] WorkOrderFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _workOrderService.SearchWorkOrders(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search work order");
            
        }
        [HttpPost]
        public async Task<IActionResult> CreateWorkOrder([FromBody] WorkOrderViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _workOrderService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create workOrder");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateWorkOrder([FromBody] WorkOrderViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _workOrderService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update workOrder");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteWorkOrder(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _workOrderService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete workOrder");
        }
    }
}
