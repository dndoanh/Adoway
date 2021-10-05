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
    public class EnterpriseService : IEnterpriseService
    {
        private readonly IMapper _Mapper;
        private readonly IEnterpriseRepository _EnterpriseRepo;
        public EnterpriseService(IMapper mapper, IEnterpriseRepository languageRepo)
        {
            _Mapper = mapper;
            _EnterpriseRepo = languageRepo;
        }

        public async Task<EnterpriseViewModel> Create(EnterpriseViewModel model)
        {
            var entity = await _EnterpriseRepo.Insert(_Mapper.Map<EnterpriseEntity>(model));
            return _Mapper.Map<EnterpriseViewModel>(entity);
        }

        public async Task<EnterpriseViewModel> Edit(EnterpriseViewModel model)
        {
            var entity = await _EnterpriseRepo.Update(_Mapper.Map<EnterpriseEntity>(model));
            return _Mapper.Map<EnterpriseViewModel>(entity);
        }

        public async Task<List<EnterpriseViewModel>> GetAll()
        {
            var list = await _EnterpriseRepo.GetAll().ToListAsync();
            return _Mapper.Map<List<EnterpriseViewModel>>(list);
        }

        public async Task<EnterpriseViewModel> Remove(EnterpriseViewModel model)
        {
            var entity = await _EnterpriseRepo.Delete(_Mapper.Map<EnterpriseEntity>(model));
            return _Mapper.Map<EnterpriseViewModel>(entity);
        }
    }
}
