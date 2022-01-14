using System;
using System.Collections.Generic;

namespace M.CP.Entities
{
    public class Project
    {
        public Project()
        {
            Workers = new List<Worker>();
            Companies = new List<Company>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ProjectStart { get; set; }
        public DateTime ProjectEnd { get; set; }
        public int Income { get; set; }
        public List<Worker> Workers { get; set; }
        public List<Company> Companies { get; set; }
    }
}
