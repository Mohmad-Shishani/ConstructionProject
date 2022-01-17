using AutoMapper;
using M.CP.Dtos.Projects;
using M.CP.Entities;

namespace M.CP.Api.AutoMapper
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<Project, ProjectDto>().ReverseMap();
        }
    }
}
