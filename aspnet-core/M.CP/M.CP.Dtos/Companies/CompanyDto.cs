using M.CP.Dtos.Projects;
using System.Collections.Generic;

namespace M.CP.Dtos.Companies
{
    public class CompanyDto
    {
        public CompanyDto()
        {
            Projects = new List<ProjectDto>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public List<ProjectDto> Projects { get; set; }

    }
}
