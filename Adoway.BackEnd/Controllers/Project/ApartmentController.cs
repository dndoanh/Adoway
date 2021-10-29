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
        private readonly IApartmentService _apartmentService;
        private readonly IMapper _mapper;
        public ApartmentController(IWebHostEnvironment webHostEnvironment, IMapper mapper, IApartmentService apartmentService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _apartmentService = apartmentService;
        }
        [HttpGet]
        public async Task<IActionResult> GetApartments(string projectId)
        {
            var result = await _apartmentService.GetApartments(CurrentEnterpriseId ?? UserEnterpriseId, Guid.Parse(projectId));
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchCategorries([FromBody] ApartmentFilterViewModel model)
        {
            var result = await _apartmentService.SearchApartments(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateApartment([FromBody] ApartmentViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _apartmentService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create apartment");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateApartment([FromBody] ApartmentViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _apartmentService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update apartment");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteApartment(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _apartmentService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete apartment");
        }
    }
}
