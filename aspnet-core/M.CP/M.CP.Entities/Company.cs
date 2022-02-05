using System.Collections.Generic;

namespace M.CP.Entities
{
    public class Company
    {
        public Company()
        {
            Projects = new List<Project>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public List<Project> Projects { get; set; }

    }
}
