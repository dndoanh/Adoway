using Adoway.Common.Extensions;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;
using Adoway.Data.Context;
using Adoway.Data.Entities.System;
using Adoway.Data.Repositories.System;
using Adoway.Service.Base;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Adoway.Service.System
{
    public class LanguageService : BaseService, ILanguageService
    {
        private readonly IMapper _Mapper;
        private readonly ILanguageRepository _LanguageRepo;
        public LanguageService(IAdowayContext dbContext, IMapper mapper, ILanguageRepository languageRepo) : base(dbContext)
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
        public async Task<List<LanguageViewModel>> GetLanguages()
        {
            var list = await _LanguageRepo.FindByAsync(x => x.Status == Common.Enums.Status.Active);
            return _Mapper.Map<List<LanguageViewModel>>(list);
        }
        public async Task<ApiResponseViewModel<LanguageViewModel>> SearchLanguages(LanguageFilterViewModel model)
        {
            var totalCount = new SqlParameter
            {
                ParameterName = "@TotalCount",
                SqlDbType = SqlDbType.Int,
                Direction = ParameterDirection.Output,
            };
            var result = await this.DbContext.DbSet<LanguageViewModel>().FromSqlRaw("EXEC SP_SearchLanguages @Name, @Locale, @Status, @SortOrder, @SortField, @PageNumber, @PageSize, @TotalCount OUTPUT",
                SqlParameterHelper.AddNullableStringParameter("@Name", model.Filter.Name),
                SqlParameterHelper.AddNullableStringParameter("@Locale", model.Filter.Locale),
                SqlParameterHelper.AddNullableInt("@Status", (int?)model.Filter.Status),
                SqlParameterHelper.AddNullableStringParameter("@SortOrder", model.SortOrder.ToString()),
                SqlParameterHelper.AddNullableStringParameter("@SortField", model.SortField),
                new SqlParameter("@PageNumber", model.PageNumber),
                new SqlParameter("@PageSize", model.PageSize),
                totalCount
                ).ToListAsync();
            return new ApiResponseViewModel<LanguageViewModel>
            {
                Entities = result,
                TotalCount = (int)totalCount.Value
            };
        }

        public async Task<LanguageViewModel> Remove(Guid id)
        {
            var entity = await _LanguageRepo.Delete(id);
            return _Mapper.Map<LanguageViewModel>(entity);
        }
    }
}
