using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Statistics;
using Budget.Dtos.Statistics;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;

namespace Budget.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IOperationRepository _operationRepository;
        private readonly IMapper _mapper;

        public StatisticsService(IOperationRepository operationRepository, IMapper mapper)
        {
            _mapper = mapper;
            _operationRepository = operationRepository;
        }
        
        public async Task<ListResponse<OperationsStatisticsItemDto>> GetOperationsStatisticsAsync(GetOperationsStatisticsRequest request)
        {
            var response = await _operationRepository.GetStatisticsAsync();
            return new ListResponse<OperationsStatisticsItemDto>
            {
                Result = _mapper.Map<List<OperationStatisticsItem>, List<OperationsStatisticsItemDto>>(response),
                Count = 2
            };
        }
    }
}