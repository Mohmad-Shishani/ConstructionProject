using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M.CP.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public int? ProjectId { get; set; }
        public Project Project { get; set; }

    }
}
