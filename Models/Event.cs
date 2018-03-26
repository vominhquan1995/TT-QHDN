using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models
{
    public class Event : Base
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string ContentHtml { get; set; }
        public string Place { get; set; }
        public string ImageURL { get; set; }
        public string LinkRegister { get; set; }
        public string RegisterTime { get; set; }
        public string Time { get; set; }
    }
}
