using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;


namespace HuRe.Models
{
    public class Job : Base
    {
        public string Place { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Experience { get; set; }
        public string Position { get; set; }
        public string Benefit { get; set; }
        public string Number { get; set; }
        public string ContentURL { get; set; }
        public string TimePre { get; set; } //thời gian thử việc 
        // public string MajorTag { get; set; }
        // public string Age { get; set; }
        public DateTime DeadlineApply { get; set; }
        [DefaultValue(0)]
        public long AppliedCount { get; set; } = 0;
        [DefaultValue(0)]
        public long ViewCount { get; set; } = 0;
        [DefaultValue(0)]
        public long InterviewCount { get; set; } = 0;
        [DefaultValue(0)]
        public long PassCount { get; set; } = 0;
        [DefaultValue(0)]
        public long FailCount { get; set; } = 0;
        // public decimal LowestSalary { get; set; }
        // public decimal HighestSalary { get; set; }
        [DefaultValue(false)]
        public bool IsHot{get;set;}
        public string  Salary {get;set;}
        public long CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public long WorkTypeId { get; set; }
        public virtual WorkType WorkType { get; set; }
        public long JobGroupId { get; set; }
        public virtual JobGroup JobGroup { get; set; }
        public virtual ICollection<Apply> Applys { get; set; }
    }
}
