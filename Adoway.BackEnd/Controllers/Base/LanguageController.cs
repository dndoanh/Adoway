using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Adoway.BackEnd.Controllers.Base;
using Microsoft.AspNetCore.Authorization;
using Adoway.Common.ViewModels.UserManagement;
using Adoway.Service.UserManagement;
using AutoMapper;
using Adoway.Service.Base;
using Adoway.Common.ViewModels.Base;

namespace Adoway.BackEnd.Controllers.Base
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class LanguageController : ApiBaseController
    {
        private readonly ILanguageService _languageService;
        private readonly IMapper _mapper;
        public LanguageController(IMapper mapper, ILanguageService languageService)
        {
            _mapper = mapper;
            _languageService = languageService;
        }
        [HttpGet]
        public async Task<IActionResult> GetLanguageList()
        {
            var result = await _languageService.GetAll();
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
        public async Task<IActionResult> DeleteLanguage([FromBody] LanguageViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _languageService.Remove(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
    }
}
