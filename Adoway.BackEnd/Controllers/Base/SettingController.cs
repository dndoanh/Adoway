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
    public class SettingController : ApiBaseController
    {
        private readonly ISettingService _settingService;
        private readonly IMapper _mapper;
        public SettingController(IMapper mapper, ISettingService settingService)
        {
            _mapper = mapper;
            _settingService = settingService;
        }
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
