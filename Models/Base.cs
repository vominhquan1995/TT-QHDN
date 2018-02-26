using System;
using System.ComponentModel.DataAnnotations;

namespace HuRe.Models
{
    public class Base
    {
        [Required]
        [Key]
        public long Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow.AddHours(7);
        public DateTime ModifiedDate { get; set; } = DateTime.UtcNow.AddHours(7);
        public string Status { get; set; }="";
    }
}