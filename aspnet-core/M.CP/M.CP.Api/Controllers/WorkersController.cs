using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using M.CP.Api.Data;
using M.CP.Entities;
using M.CP.Dtos.Workers;
using AutoMapper;
using System;

namespace M.CP.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        #region Data & Constructer

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public WorkersController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Services

        [HttpGet]
        public async Task<List<WorkerDto>> GetWorkers()
        {
            var workers = await _context
                                .Workers
                                .Include(w => w.Tools)
                                .Include(w => w.Projects)
                                .ToListAsync();

            var workerDtos = _mapper.Map<List<WorkerDto>>(workers);

            return workerDtos;
        }



        [HttpGet("{id}")]
        public async Task<WorkerDto> GetWorkerById(int id)
        {
            var worker = await _context
                                .Workers
                                .Include(w => w.Tools)
                                .Include(w => w.Projects)
                                .Where(w => w.Id == id)
                                .SingleOrDefaultAsync();


            var workerDto = _mapper.Map<WorkerDto>(worker);

            return workerDto;
        }



        [HttpPost]
        public async Task CreateWorker([FromBody] WorkerDto workerDto)
        {
            var worker = _mapper.Map<Worker>(workerDto);

            await UpdateWorkerProjects(workerDto, worker);
            await UpdateWorkerTools(workerDto, worker);

            worker.PaymentDate = DateTime.Now;

            await _context.AddAsync(worker);
            await _context.SaveChangesAsync();
        }



        [HttpPut("{id}")]
        public async Task EditWorker(int id, [FromBody] WorkerDto workerDto)
        {
            var worker = await _context
                                .Workers
                                .Include(w => w.Tools)
                                .Include(w => w.Projects)
                                .Where(w => w.Id == id)
                                .SingleOrDefaultAsync();

            _mapper.Map(workerDto, worker);

            await UpdateWorkerProjects(workerDto,worker);
            await UpdateWorkerTools(workerDto,worker);


            _context.Update(worker);
            await _context.SaveChangesAsync();

        }

        [HttpPost("{id}")]
        public async Task PayWorker(int id)
        {
            var worker = await _context.Workers.FindAsync(id);
            worker.Payment = true;
            worker.PaymentDate = DateTime.Now;

            _context.Update(worker);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id}")]
        public async Task DeleteWorker(int id)
        {
            var worker = await _context.Workers.FindAsync(id);
            _context.Remove(worker);
            await _context.SaveChangesAsync();
        }

        #endregion



        #region Private Methods

        private async Task UpdateWorkerProjects(WorkerDto workerDto, Worker worker)
        {
            var projectIds = GetProjectsIdsFromDto(workerDto);

            var projects = await _context.Projects.Where(p => projectIds.Contains(p.Id)).ToListAsync();

            //var projects = await _context
            //            .Projects
            //            .Where(p => projectIds.Contains(p.Id))
            //            .ToListAsync();

            worker.Projects.Clear();
            worker.Projects.AddRange(projects);
        }

        private List<int> GetProjectsIdsFromDto(WorkerDto workerDto)
        {
            var projectsIds = new List<int>();

            foreach (var project in workerDto.Projects)
            {
                projectsIds.Add(project.Id);
            }

            return projectsIds;
        }



        private async Task UpdateWorkerTools(WorkerDto workerDto, Worker worker)
        {
            var toolIds = GetToolsIdsFromDto(workerDto);

            var tools = await _context.Tools.Where(p => toolIds.Contains(p.Id)).ToListAsync();


            worker.Tools.Clear();
            worker.Tools.AddRange(tools);
        }
        private List<int> GetToolsIdsFromDto(WorkerDto workerDto)
        {
            var toolsIds = new List<int>();

            foreach (var project in workerDto.Tools)
            {
                toolsIds.Add(project.Id);
            }

            return toolsIds;
        }

        #endregion
    }

}
