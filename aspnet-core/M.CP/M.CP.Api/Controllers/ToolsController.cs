using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using M.CP.Api.Data;
using M.CP.Entities;
using M.CP.Dtos.Tools;
using AutoMapper;

namespace M.CP.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        #region Data & Constructor

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ToolsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Sevices

        [HttpGet]
        public async Task<List<ToolDto>> GetTools()
        {
            var tools = await _context.Tools.ToListAsync();

            var toolDtos = _mapper.Map<List<ToolDto>>(tools);

            return toolDtos;
        }



        [HttpGet("{id}")]
        public async Task<ToolDto> GetTool(int id)
        {
            var tool = await _context.Tools.FindAsync(id);

            var toolDto = _mapper.Map<ToolDto>(tool);

            return toolDto;
        }



        [HttpPost]
        public async Task CreateTool([FromBody] ToolDto toolDto)
        {
            var tool = _mapper.Map<Tool>(toolDto);
            await _context.Tools.AddAsync(tool);
            await _context.SaveChangesAsync();

        }



        [HttpPut("{id}")]
        public async Task EditTool(int id, [FromBody] ToolDto toolDto)
        {
            var tool = await _context.Tools.FindAsync(id);
            _mapper.Map(toolDto, tool);

            _context.Update(tool);
            await _context.SaveChangesAsync();
        }




        [HttpDelete("{id}")]
        public async Task DeleteTool(int id)
        {
            var tool = await _context.Tools.FindAsync(id);

            _context.Tools.Remove(tool);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Private Method
        private bool ToolExists(int id)
        {
            return _context.Tools.Any(e => e.Id == id);
        }
        #endregion
    }
}
