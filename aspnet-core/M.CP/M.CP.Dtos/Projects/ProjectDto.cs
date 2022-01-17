using M.CP.Dtos.Companies;
using M.CP.Dtos.Workers;
using System;
using System.Collections.Generic;

namespace M.CP.Dtos.Projects
{
    public class ProjectDto
    {
        public ProjectDto()
        {
            Workers = new List<WorkerDto>();
            Companies = new List<CompanyDto>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ProjectStart { get; set; }
        public DateTime ProjectEnd { get; set; }
        public int Income { get; set; }
        public List<WorkerDto> Workers { get; set; }
        public List<CompanyDto> Companies { get; set; }
    }
}
