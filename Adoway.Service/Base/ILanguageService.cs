using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Adoway.Common.ViewModels.Base;

namespace Adoway.Service.Base
{
    public interface ILanguageService
    {
        Task<LanguageViewModel> Create(LanguageViewModel model);
        Task<LanguageViewModel> Edit(LanguageViewModel model);
        Task<LanguageViewModel> Remove(LanguageViewModel model);
        Task<List<LanguageViewModel>> GetAll();
    }
}
