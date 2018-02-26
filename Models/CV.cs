using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models
{
    public class CV : Base
    {
        public string Position { get; set; }
        public string Place { get; set; }
        public string Level { get; set; }
        public string Experience { get; set; }
        public long AccountId { get; set; }
        public virtual Account Account { get; set; }
    }
}
