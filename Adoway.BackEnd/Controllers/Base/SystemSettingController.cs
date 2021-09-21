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
    public class SystemSettingController : ApiBaseController
    {
        private readonly ILanguageService _languageService;
        private readonly ISettingService _settingService;
        private readonly IMapper _mapper;
        public SystemSettingController(IMapper mapper, ILanguageService languageService, ISettingService settingService)
        {
            _mapper = mapper;
            _languageService = languageService;
            _settingService = settingService;
        }
        // Language
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
        // Setting
        [HttpGet]
        public async Task<IActionResult> GetSettingList()
        {
            var result = await _settingService.GetAll();
            return new ObjectResult(result);
        }
        [HttpPost]
        public async Task<IActionResult> UpdateSetting([FromBody] List<SettingViewModel> model)
        {
            if (ModelState.IsValid)
            {
                var result = await _settingService.Edit(model);
                return new ObjectResult(result);
            }
            return BadRequest("Could not create access token");
        }
    }
}
