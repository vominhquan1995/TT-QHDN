using HuRe.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Db
{
    public class InitDb
    {
         public static void Init(JobDbContext _context)
        {
            _context.Database.EnsureCreated();
            //if (!_context.PhanQuyens.Any())
            //{
            //    _context.PhanQuyens.Add(new Models.PhanQuyen
            //    {
            //        Ten = "Admin",
            //        MoTa = "Dùng cho quản trị"
            //    });
            //    _context.SaveChanges();
            //}
            //if (!_context.TaiKhoans.Any())
            //{
            //    _context.TaiKhoans.Add(new Models.TaiKhoan
            //    {
            //        TenTaiKhoan = "quanvo",
            //        MatKhau = Protector.HashPassword("123456"),
            //        PhanQuyenId = _context.PhanQuyens.First(o => o.Ten == "Admin").Id
            //    });
            //    _context.SaveChanges();
            //}
        }
    }
}
