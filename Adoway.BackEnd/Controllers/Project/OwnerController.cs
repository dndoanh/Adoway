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
    public class OwnerController : ApiBaseController
    {
        private readonly IOwnerService _ownerService;
        public OwnerController(IWebHostEnvironment webHostEnvironment, IOwnerService ownerService) : base(webHostEnvironment)
        {
            _ownerService = ownerService;
        }
        [HttpGet]
        public async Task<IActionResult> GetOwners()
        {
            var result = await _ownerService.GetOwners(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchOwners([FromBody] OwnerFilterViewModel model)
        {
            var result = await _ownerService.SearchOwners(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOwner([FromBody] OwnerViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _ownerService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create owner");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateOwner([FromBody] OwnerViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _ownerService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update owner");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteOwner(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _ownerService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete owner");
        }
    }
}
