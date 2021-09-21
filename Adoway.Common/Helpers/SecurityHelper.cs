using System;
namespace Adoway.Common.Helpers
{
    public class SecurityHelper
    {
        private static string alphaCaps = "QWERTYUIOPASDFGHJKLZXCVBNM";
        private static string alphaLow = "qwertyuiopasdfghjklzxcvbnm";
        private static string numerics = "1234567890";
        private static string special = "@#$!%*";
        private static string allChars = alphaCaps + alphaLow + numerics + special;
        public static string GeneratePassword(int length)
        {
            Random r = new Random();
            string generatedPassword = string.Empty;

            for (int i = 0; i < length; i++)
            {
                double rand = r.NextDouble();
                if (i == 0)
                {
                    generatedPassword += alphaCaps.ToCharArray()[(int)Math.Floor(rand * alphaCaps.Length)];
                }
                else
                {
                    generatedPassword += allChars.ToCharArray()[(int)Math.Floor(rand * allChars.Length)];
                }
            }
            return generatedPassword;
        }
        public static string SHA1Hash(string value)
        {
            return BitConverter.ToString(System.Security.Cryptography.SHA1.Create().ComputeHash(System.Text.Encoding.Default.GetBytes(value))).Replace("-", string.Empty).ToLower();
        }
    }
}

