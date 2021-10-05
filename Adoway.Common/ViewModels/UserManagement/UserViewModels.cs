﻿using Adoway.Common.Enums;
using System;
using System.Collections.Generic;

namespace Adoway.Common.ViewModels.UserManagement
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool EmailVerified { get; set; }
        public string AvatarUrl { get; set; }
        public Status Status { get; set; }
        public string RefreshToken { get; set; }
        public Guid? LanguageId { get; set; }
        public Guid? EnterpriseId { get; set; }
    }
    public class UserAuthViewModel : UserViewModel
    {
        public string AccessToken { get; set; }
    }
    public class UserListViewModel
    {
        public List<UserViewModel> Items { get; set; }
        public int TotalCount { get; set; }
        public string ErrMsg { get; set; }
    }
    public class UserInRoleViewModel
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public bool BelongTo { get; set; }
    }
    public class UserInRoleListViewModel
    {
        public List<UserInRoleViewModel> Items { get; set; }
        public int TotalCount { get; set; }
        public string ErrMsg { get; set; }
    }
}
