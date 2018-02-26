using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HuRe.Util
{
    public static class Protector
    {
        public static string HashPassword(String password)
        {
            var bytes = new UTF8Encoding().GetBytes(password);
            var hashBytes = System.Security.Cryptography.MD5.Create().ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }

        //type pbkdf2 with salt input
        //public static string HashPassword1(string password)
        //{
        //    //install pagekage Install-Package Microsoft.AspNet.Cryptography.KeyDerivation -Version 1.0.0-rc1-final -Pre
        //    return Convert.ToBase64String(KeyDerivation.Pbkdf2(
        //         password: password,
        //         salt: Encoding.UTF8.GetBytes("WebService"),
        //         prf: KeyDerivationPrf.HMACSHA1,
        //         iterationCount: 10000,
        //         numBytesRequested: 256 / 8
        //         ));
        //}
    }
}
