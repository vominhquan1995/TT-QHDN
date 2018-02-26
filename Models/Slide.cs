using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models
{
    public class Slide : Base
    {
        public string TitleParent { get; set; }
        public string TitleChild { get; set; }
        public string ImageURL { get; set; }
        public string Index { get; set; }
        public bool IsShow { get; set; }
    }
}
