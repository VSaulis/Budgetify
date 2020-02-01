using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Statistics;
using Budget.Dtos.Statistics;
using Budget.Models.Services;
using Budget.System.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : BaseController
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }
        
        [HttpGet("operations")]
        [PermissionRequirement(Permissions.CanViewStatistics)]
        public async Task<ListResponse<OperationsStatisticsItemDto>> Operations(GetOperationsStatisticsRequest request)
        {
            var response = await _statisticsService.GetOperationsStatisticsAsync(request);
            return CreateResponse(response);
        }
    }
}