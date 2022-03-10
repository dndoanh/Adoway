using System;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

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
        public static DateTime ConvertToDateTimeGB(this string s)
        {
            DateTime result;
            if (!DateTime.TryParse(s, out result))
            {
                result = DateTime.ParseExact(s, "dd/MM/yyyyT24:mm:ssK", System.Globalization.CultureInfo.InvariantCulture);
                result = result.AddDays(1);
            }
            return result;
        }
        public static string MonthToString(this DateTime dt)
        {
            var month = dt.Month;
            switch (month)
            {
                case 1:
                    return "Jan";
                case 2:
                    return "Feb";
                case 3:
                    return "Mar";
                case 4:
                    return "Apr";
                case 5:
                    return "May";
                case 6:
                    return "Jun";
                case 7:
                    return "Jul";
                case 8:
                    return "Aug";
                case 9:
                    return "Sep";
                case 10:
                    return "Oct";
                case 11:
                    return "Nov";
                case 12:
                    return "Dec";
                default:
                    return "";
            }
           
        }
        public static Stream GenerateStreamFromString(string base64)
        {
            try
            {
                base64 = Regex.Replace(base64, Constants.Constants.BASE64_EXCEL_PATTERN, "");
                var bytes = Convert.FromBase64String(base64);
                var stream = new MemoryStream(bytes);
                return stream;
            }
            catch (Exception ex)
            {

                var error = "";
            }
            return null;
        
        }
    }
}
