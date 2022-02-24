using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using M.CP.Api.Data;
using M.CP.Entities;
using M.CP.Dtos.Projects;
using AutoMapper;

namespace M.CP.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        #region Data & Constructer

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProjectsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Services

        [HttpGet]
        public async Task<List<ProjectDto>> GetProjects()
        {
            var projects = await _context
                                 .Projects
                                 .Include(p => p.Workers)
                                 .ToListAsync();

            var projectDtos = _mapper.Map<List<ProjectDto>>(projects);

            return projectDtos;
        }



        [HttpGet("{id}")]
        public async Task<ProjectDto> GetProjectById(int id)
        {
            var project = await _context
                                .Projects
                                .Include(p => p.Workers)
                                .Include(p => p.Company)
                                .Where(p => p.Id == id)
                                .SingleOrDefaultAsync();

            var projectDto = _mapper.Map<ProjectDto>(project);

            return projectDto;
        }



        [HttpPost]
        public async Task CreateProject([FromBody] ProjectDto projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);
            if (projectDto.Workers != null)
            {
                await UpdateProjectWorkers(projectDto, project);
            }

            await _context.AddAsync(project);
            await _context.SaveChangesAsync();

        }



        [HttpPut("{id}")]
        public async Task EditProject(int id, [FromBody] ProjectDto projectDto)
        {
            var project = await _context
                                .Projects
                                .Include(p => p.Workers)
                                .Include(p => p.Company)
                                .Where(p => p.Id == id)
                                .SingleOrDefaultAsync();

            _mapper.Map(projectDto, project);

            await UpdateProjectWorkers(projectDto, project);

            if (projectDto.CompanyId.HasValue)
            {
                var company = await _context.Companies.FindAsync(projectDto.CompanyId);
                project.Company = company;
            }

            _context.Update(project);
            await _context.SaveChangesAsync();
        }



        [HttpDelete("{id}")]
        public async Task DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }



        #endregion

        #region Privte Methode



        private async Task UpdateProjectWorkers(ProjectDto projectDto, Project project)
        {
            var workerIds = GetWorkersIdsFromDto(projectDto);

            var workers = await _context
                                    .Workers
                                    .Where(w => workerIds.Contains(w.Id))
                                    .ToListAsync();

            project.Workers.Clear();
            project.Workers.AddRange(workers);
        }

        private List<int> GetWorkersIdsFromDto(ProjectDto projectDto)
        {
            var workersIds = new List<int>();

            foreach (var worker in projectDto.Workers)
            {
                workersIds.Add(worker.Id);
            }

            return workersIds;
        }


        #endregion
    }
}
