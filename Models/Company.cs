using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models
{
    public class Company : Base
    {
        public string Name { get; set; }
        public string JobGroup { get; set; }
        public string Address { get; set; } = "Chưa cập nhật";
        public string PhoneCompany { get; set; } = "Chưa cập nhật";
        public string EmailCompany { get; set; } = "Chưa cập nhật";
        public string TaxCode { get; set; }
        public string URLLogo { get; set; } = "/resources/logo_default.png";
        public string Representor { get; set; } = "Chưa cập nhật";
        public string EmailRepresentor { get; set; } = "Chưa cập nhật";
        public string PhoneRepresentor { get; set; } = "Chưa cập nhật";
        public string RepresentorAnother { get; set; } = "Chưa cập nhật";
        public string Description { get; set; } = "Chưa cập nhật";
        public bool IsPartner { get; set; } = false;
        public virtual ICollection<Job> Jobs { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }
    }
}
