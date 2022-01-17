﻿using M.CP.Dtos.Projects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace M.CP.Dtos.Companies
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public int? ProjectId { get; set; }
        public ProjectDto Project { get; set; }

    }
}
