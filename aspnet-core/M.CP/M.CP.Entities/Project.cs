using System;
using System.Collections.Generic;

namespace M.CP.Entities
{
    public class Project
    {
        public Project()
        {
            Workers = new List<Worker>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ProjectStart { get; set; }
        public DateTime ProjectEnd { get; set; }
        public int Income { get; set; }
        public List<Worker> Workers { get; set; }
        public int? CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
