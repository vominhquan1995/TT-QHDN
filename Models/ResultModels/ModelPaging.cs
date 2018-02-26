using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HuRe.Models.ResultModels
{
    public class ModelPaging<T>
    {
        public int total { get; set; }
        public IEnumerable<T> data { get; set; }
    }
}
