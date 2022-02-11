using M.CP.Utilities.Enums;
using System;
using System.Collections.Generic;

namespace M.CP.Entities
{
    public class Worker
    {
        public Worker()
        {
            Tools = new List<Tool>();
            Projects = new List<Project>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public Shift Shift { get; set; }
        public bool Payment { get; set; }
        public DateTime? PaymentDate { get; set; }

        public List<Tool> Tools { get; set; }
        public List<Project> Projects { get; set; }
    }
}
