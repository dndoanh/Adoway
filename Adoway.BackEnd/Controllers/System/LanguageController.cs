using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.System;
using Adoway.Common.ViewModels.System;

namespace Adoway.BackEnd.Controllers.System
{
    public class LanguageController : ApiBaseController
    {
        private readonly ILanguageService _languageService;
        private readonly IMapper _mapper;
        public LanguageController(IWebHostEnvironment webHostEnvironment, IMapper mapper, ILanguageService languageService) : base(webHostEnvironment)
        {
            _mapper = mapper;
            _languageService = languageService;
        }
        // Language
        [HttpGet]
        public async Task<IActionResult> GetLanguages()
        {
            var result = await _languageService.GetLanguages();
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> SearchLanguages([FromBody] LanguageFilterViewModel model)
        {
            var result = await _languageService.SearchLanguages(model);
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLanguage([FromBody] LanguageViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _languageService.Create(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
        [HttpPost]
        public async Task<IActionResult> UpdateLanguage([FromBody] LanguageViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _languageService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
        [HttpPost]
        public async Task<IActionResult> DeleteLanguage(string id)
        {
            if (ModelState.IsValid)
            {
                var result = await _languageService.Remove(Guid.Parse(id));
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
    }
}
