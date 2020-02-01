using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Statistics;
using Budget.Dtos.Statistics;

namespace Budget.Models.Services
{
    public interface IStatisticsService
    {
        Task<ListResponse<OperationsStatisticsItemDto>> GetOperationsStatisticsAsync(GetOperationsStatisticsRequest request);
    }
}