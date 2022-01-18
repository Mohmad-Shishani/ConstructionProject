using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using M.CP.Api.Data;
using M.CP.Entities;
using M.CP.Dtos.Companies;
using AutoMapper;

namespace M.CP.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        #region Data & Constrocter

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CompaniesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services

        [HttpGet]
        public async Task<List<CompanyDto>> GetCompanies()
        {
            var companies = await _context.Companies.ToListAsync();

            var companyDtos = _mapper.Map<List<CompanyDto>>(companies);

            return companyDtos;
        }

        [HttpGet("{id}")]
        public async Task<CompanyDto> GetCompanyById(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            var companyDto = _mapper.Map<CompanyDto>(company);
            return companyDto;
        }



        [HttpPost]
        public async Task CreateCompany([FromBody] CompanyDto companyDto)
        {
            var company = _mapper.Map<Company>(companyDto);
            await _context.AddAsync(company);

            await _context.SaveChangesAsync();

        }



        [HttpPut("{id}")]
        public async Task EditCompany(int id, [FromBody] CompanyDto companyDto)
        {
            var company = _mapper.Map<Company>(companyDto);

            _context.Update(company);
            await _context.SaveChangesAsync();
        }



        [HttpDelete("{id}")]
        public async Task DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();
        }
        #endregion

        #region Private Methode
        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
        #endregion
    }
}
