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
    public class ProjectController : ApiBaseController
    {
        private readonly IProjectService _projectService;
        public ProjectController(IWebHostEnvironment webHostEnvironment, IProjectService projectService) : base(webHostEnvironment)
        {
            _projectService = projectService;
        }
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var result = await _projectService.GetProjects(CurrentEnterpriseId ?? UserEnterpriseId);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchProjects([FromBody] ProjectFilterViewModel model)
        {
            var result = await _projectService.SearchProjects(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] ProjectViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _projectService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create project");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _projectService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not update project");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteProject(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _projectService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not delete project");
        }
    }
}
