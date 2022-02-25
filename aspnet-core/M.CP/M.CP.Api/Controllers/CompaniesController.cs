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
            var companies = await _context
                                  .Companies
                                  .Include(c => c.Projects)
                                  .ToListAsync();

            var companyDtos = _mapper.Map<List<CompanyDto>>(companies);

            return companyDtos;
        }



        [HttpGet("{id}")]
        public async Task<CompanyDto> GetCompanyById(int id)
        {
            var company = await _context
                                .Companies
                                .Include(c => c.Projects)
                                .Where(c => c.Id == id)
                                .SingleOrDefaultAsync();

            var companyDto = _mapper.Map<CompanyDto>(company);

            return companyDto;
        }



        [HttpPost]
        public async Task CreateCompany([FromBody] CompanyDto companyDto)
        {
            var company = _mapper.Map<Company>(companyDto);

            if (companyDto.Projects != null)
            {
                await UpdateCompanyProjects(companyDto, company);
            }

            await _context.AddAsync(company);
            await _context.SaveChangesAsync();
        }



        [HttpPut("{id}")]
        public async Task EditCompany(int id, [FromBody] CompanyDto companyDto)
        {
            var company = await _context
                                .Companies
                                .Include(c => c.Projects)
                                .Where(c => c.Id == id)
                                .SingleOrDefaultAsync();

            _mapper.Map(companyDto, company);

            await UpdateCompanyProjects(companyDto, company);

            _context.Update(company);
            await _context.SaveChangesAsync();
        }



        [HttpDelete("{id}")]
        public async Task DeleteCompany(int id)
        {
            var company = await _context.Companies.FindAsync(id);
            _context.Remove(company);
            await _context.SaveChangesAsync();
        }

        #endregion

        #region Private Methode
        private async Task UpdateCompanyProjects(CompanyDto companyDto, Company company)
        {
            var projectIds = GetProjectsIdsFromDto(companyDto);

            var projects = await _context.Projects.Where(p => projectIds.Contains(p.Id)).ToListAsync();

            //var companies = await _context
            //            .Companies
            //            .Where(c => companyIds.Contains(c.Id))
            //            .ToListAsync();

            company.Projects.Clear();
            company.Projects.AddRange(projects);
        }

        private List<int> GetProjectsIdsFromDto(CompanyDto companyDto)
        {
            var projectsIds = new List<int>();

            foreach (var project in companyDto.Projects)
            {
                projectsIds.Add(project.Id);
            }

            return projectsIds;
        }

        #endregion
    }
}
