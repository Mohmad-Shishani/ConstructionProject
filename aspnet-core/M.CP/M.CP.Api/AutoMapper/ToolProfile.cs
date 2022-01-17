using AutoMapper;
using M.CP.Dtos.Tools;
using M.CP.Entities;

namespace M.CP.Api.AutoMapper
{
    public class ToolProfile : Profile
    {
        public ToolProfile()
        {
            CreateMap<Tool, ToolDto>().ReverseMap();
        }
    }
}
