using AutoMapper;
using M.CP.Dtos.Companies;
using M.CP.Entities;

namespace M.CP.Api.AutoMapper
{
    public class CompanyProfile : Profile
    {
        public CompanyProfile()
        {
            CreateMap<Company, CompanyDto>().ReverseMap();
        }
    }
}
