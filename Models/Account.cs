using System;
using System.Collections.Generic;

namespace HuRe.Models
{
    public class Account
    {
        public long Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string Class { get; set; } = "Không có";
        public string Mssv { get; set; } = "Không có";
        public string Department { get; set; } = "Không có";
        public string FullName { get; set; } = "Không xác định";
        public string Email { get; set; }
        public bool Sex { get; set; } = false;
        public DateTime DateOfBirth { get; set; } = DateTime.Now;
        public string PhoneNumber { get; set; } = "Không xác định";
        public string Address { get; set; } = "Không xác định";
        public string PasswordHashed { get; set; }
        public string Avatar { get; set; } = "/resources/default-avatar.jpg";
        public long? RoleId { get; set; }
        public virtual Role Role { get; set; }
        public long? CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        public bool IsActivated { get; set; } = false;
        public virtual ICollection<Apply> Applys { get; set; } = new List<Apply>();
        public virtual CV CV { get; set; }
    }
}
