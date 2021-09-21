using AutoMapper;
using Adoway.Common.ViewModels.Base;
using Adoway.Data.Entities.Base;
using Adoway.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Adoway.Service.Base
{
    public class SettingService : ISettingService
    {
        private readonly IMapper _Mapper;
        private readonly ISettingRepository _settingRepo;
        public SettingService(IMapper mapper, ISettingRepository settingRepo)
        {
            _Mapper = mapper;
            _settingRepo = settingRepo;
        }

        public async Task<SettingViewModel> Create(SettingViewModel model)
        {
            var entity = await _settingRepo.Insert(_Mapper.Map<SettingEntity>(model));
            return _Mapper.Map<SettingViewModel>(entity);
        }

        public async Task<List<SettingViewModel>> Edit(List<SettingViewModel> settings)
        {
            var result = new List<SettingEntity>();
            foreach (var setting in settings)
            {
                if(setting.Id != Guid.Empty)
                {
                    var entity = await _settingRepo.Update(_Mapper.Map<SettingEntity>(setting));
                    result.Add(entity);
                } else
                {
                    var entity = await _settingRepo.Insert(_Mapper.Map<SettingEntity>(setting));
                    result.Add(entity);
                }
            }
            return _Mapper.Map<List<SettingViewModel>>(result);
        }

        public async Task<List<SettingViewModel>> GetAll()
        {
            var list = await _settingRepo.GetAll().ToListAsync();
            return _Mapper.Map<List<SettingViewModel>>(list);
        }

        public async Task<SettingViewModel> Remove(SettingViewModel model)
        {
            var entity = await _settingRepo.Delete(_Mapper.Map<SettingEntity>(model));
            return _Mapper.Map<SettingViewModel>(entity);
        }
    }
}
