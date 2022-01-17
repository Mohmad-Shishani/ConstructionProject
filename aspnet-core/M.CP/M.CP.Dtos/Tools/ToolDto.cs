using M.CP.Dtos.Workers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M.CP.Dtos.Tools
{
    public class ToolDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? WorkerId { get; set; }
        public WorkerDto Worker { get; set; }
    }
}
