using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models
{
    public class JobGroup:Base
    {

        public string Name { get; set; }
        public string Description { get; set; }
        public string ShortName { get; set; }
        public string ImageURL { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
    }
}
