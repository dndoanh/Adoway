using System;
using System.Collections.Generic;

namespace Adoway.Common.Extensions
{
    public static class ObjectExtension
    {
        public static bool IsNull(this object obj)
        {
            if (obj == null || DBNull.Value == obj)
                return true;
            return false;
        }
        public static bool IsNotNull(this object obj)
        {
            return !IsNull(obj);
        }
        public static bool IsNullOrEmpty<T>(this List<T> list)
        {
            if (list == null)
                return true;
            if (list.Count == 0)
                return true;
            return false;
        }
        public static bool IsNotNullOrEmpty<T>(this List<T> obj)
        {
            return !IsNullOrEmpty(obj);
        }
        public static string ConvertToString(this object value)
        {
            if (value == null)
                return string.Empty;
            return value.ToString();
        }
    }
}
