﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
namespace Adoway.Service.Base
{
    public interface ISettingService
    {
        Task<SettingViewModel> Create(SettingViewModel model);
        Task<List<SettingViewModel>> Edit(List<SettingViewModel> settings);
        Task<SettingViewModel> Remove(SettingViewModel model);
        Task<List<SettingViewModel>> GetAll();
    }
}
