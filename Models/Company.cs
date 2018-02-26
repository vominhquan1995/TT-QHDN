using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models
{
    public class Company : Base
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Website { get; set; } = "Không có";
        public string Scales { get; set; } = "Chưa cập nhật";
        public string Email { get; set; }
        public string TaxCode { get; set; }
        public string URLLogo { get; set; } = "/resources/logo_default.png";
        public string Representor { get; set; }
        public string Description { get; set; } = "Chưa cập nhật";
        public bool IsPartner { get; set; } = false;
        public virtual ICollection<Job> Jobs { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }
    }
}
