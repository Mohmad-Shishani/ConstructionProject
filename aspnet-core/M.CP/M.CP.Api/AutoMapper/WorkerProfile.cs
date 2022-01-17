using AutoMapper;
using M.CP.Dtos.Workers;
using M.CP.Entities;

namespace M.CP.Api.AutoMapper
{
    public class WorkerProfile : Profile
    {
        public WorkerProfile()
        {
            CreateMap<Worker, WorkerDto>().ReverseMap();
        }
    }
}
