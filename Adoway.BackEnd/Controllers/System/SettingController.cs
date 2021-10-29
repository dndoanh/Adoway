using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Adoway.BackEnd.Controllers.Base;
using Adoway.Service.System;
using Adoway.Common.ViewModels.System;

namespace Adoway.BackEnd.Controllers.System
{
    public class SettingController : ApiBaseController
    {
        private readonly ISettingService _settingService;
        public SettingController(IWebHostEnvironment webHostEnvironment, ISettingService settingService) : base(webHostEnvironment)
        {
            _settingService = settingService;
        }
        // Setting
        [HttpGet]
        public async Task<IActionResult> GetSettings()
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
