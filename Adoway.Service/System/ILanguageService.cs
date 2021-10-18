using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;
using Adoway.Common.ViewModels.System;

namespace Adoway.Service.System
{
    public interface ILanguageService
    {
        Task<LanguageViewModel> Create(LanguageViewModel model);
        Task<LanguageViewModel> Edit(LanguageViewModel model);
        Task<LanguageViewModel> Remove(Guid id);
        Task<List<LanguageViewModel>> GetAll();
        Task<List<LanguageViewModel>> GetLanguages();
        Task<ApiResponseViewModel<LanguageViewModel>> SearchLanguages(LanguageFilterViewModel model);
    }
}
