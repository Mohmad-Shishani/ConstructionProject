using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M.CP.Entities
{
    public class Tool
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}
