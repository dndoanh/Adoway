using Adoway.Common.Enums;
using Adoway.Common.ViewModels.Base;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.UserManagement
{
    public class RoleViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Status Status { get; set; }
        public Guid? EnterpriseId { get; set; }
    }
    public class RoleAuthViewModel : RoleViewModel
    {
        public string AccessToken { get; set; }
    }
    public class RoleFilterViewModel : BaseFilterViewModel
    {
        public RoleFilter Filter { get; set; }
    }
    public class RoleFilter
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? EnterpriseId { get; set; }
        public Status? Status { get; set; }
    }
    public class RoleInScreenViewModel
    {
        public Guid Id { get; set; }
        public Guid ScreenId { get; set; }
        public string ScreenName { get; set; }
        public Guid RoleId { get; set; }
        public bool BelongTo { get; set; }
        public List<RoleInScreenFunctionViewModel> ScreenFunctions {get;set;}
    }
    public class RoleInScreenFunctionViewModel
    {
        public Guid Id { get; set; }
        public Guid ScreenFunctionId { get; set; }
        public string FunctionName { get; set; }
        public Guid RoleId { get; set; }
        public bool BelongTo { get; set; }
    }
    public class RoleInScreenListViewModel
    {
        public List<RoleInScreenViewModel> Items { get; set; }
        public int TotalCount { get; set; }
        public string ErrMsg { get; set; }
    }
}
