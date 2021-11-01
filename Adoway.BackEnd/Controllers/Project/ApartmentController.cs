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
    public class ApartmentController : ApiBaseController
    {
        private readonly IApartmentService _apartService;
        public ApartmentController(IWebHostEnvironment webHostEnvironment, IApartmentService apartmentService) : base(webHostEnvironment)
        {
            _apartService = apartmentService;
        }
        [HttpGet]
        public async Task<IActionResult> GetApartments(string projectId)
        {
            var result = await _apartService.GetApartments(CurrentEnterpriseId ?? UserEnterpriseId, Guid.Parse(projectId));
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchApartments([FromBody] ApartmentFilterViewModel model)
        {
            if (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue)
            {
                model.Filter.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _apartService.SearchApartments(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not search apartment");
        }
        [HttpPost]
        public async Task<IActionResult> CreateApartment([FromBody] ApartmentViewModel model)
        {
            if (ModelState.IsValid && (CurrentEnterpriseId.HasValue || UserEnterpriseId.HasValue))
            {
                model.EnterpriseId = (Guid)(CurrentEnterpriseId ?? UserEnterpriseId);
                var result = await _apartService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create apartment");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateApartment([FromBody] ApartmentViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _apartService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update apartment");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteApartment(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _apartService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete apartment");
        }
    }
}
