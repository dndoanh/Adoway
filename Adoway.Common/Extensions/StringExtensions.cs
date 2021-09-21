using System;
namespace Adoway.Common.Extensions
{
    public static class StringExtensions
    {
        public static bool IsNullOrEmpty(this string str)
        {
            if (string.IsNullOrEmpty(str) || (string.IsNullOrWhiteSpace(str)))
                return true;
            return false;
        }
    }
}
