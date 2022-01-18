using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using M.CP.Api.Data;
using M.CP.Entities;
using M.CP.Dtos.Workers;
using AutoMapper;

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
    }
}
