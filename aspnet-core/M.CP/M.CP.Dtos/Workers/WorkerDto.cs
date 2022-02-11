using M.CP.Dtos.Projects;
using M.CP.Dtos.Tools;
using M.CP.Utilities.Enums;
using System;
using System.Collections.Generic;

namespace M.CP.Dtos.Workers
{
    public class WorkerDto
    {
        public WorkerDto()
        {
            Tools = new List<ToolDto>();
            Projects = new List<ProjectDto>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public Shift Shift { get; set; }
        public bool Payment { get; set; }
        public DateTime? PaymentDate { get; set; }

        public List<ToolDto> Tools { get; set; }
        public List<ProjectDto> Projects { get; set; }
    }
}
