using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Adoway.Common.ViewModels.Base;
using Adoway.Data.Entities.Base;
using Adoway.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Adoway.Service.Base
{
    public class LanguageService : ILanguageService
    {
        private readonly IMapper _Mapper;
        private readonly ILanguageRepository _LanguageRepo;
        public LanguageService(IMapper mapper, ILanguageRepository languageRepo)
        {
            _Mapper = mapper;
            _LanguageRepo = languageRepo;
        }

        public async Task<LanguageViewModel> Create(LanguageViewModel model)
        {
            var entity = await _LanguageRepo.Insert(_Mapper.Map<LanguageEntity>(model));
            return _Mapper.Map<LanguageViewModel>(entity);
        }

        public async Task<LanguageViewModel> Edit(LanguageViewModel model)
        {
            var entity = await _LanguageRepo.Update(_Mapper.Map<LanguageEntity>(model));
            return _Mapper.Map<LanguageViewModel>(entity);
        }

        public async Task<List<LanguageViewModel>> GetAll()
        {
            var list = await _LanguageRepo.GetAll().ToListAsync();
            return _Mapper.Map<List<LanguageViewModel>>(list);
        }

        public async Task<LanguageViewModel> Remove(LanguageViewModel model)
        {
            var entity = await _LanguageRepo.Delete(_Mapper.Map<LanguageEntity>(model));
            return _Mapper.Map<LanguageViewModel>(entity);
        }
    }
}
