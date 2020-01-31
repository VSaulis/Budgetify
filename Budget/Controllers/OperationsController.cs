using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Operation;
using Budget.Dtos.Operation;
using Budget.Models.Services;
using Budget.System.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperationsController : BaseController
    {
        private readonly IOperationService _operationService;

        public OperationsController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpGet]
        [PermissionRequirement(Permissions.CanViewOperations)]
        public async Task<ListResponse<OperationsListItemDto>> List([FromQuery] ListOperationsRequest request)
        {
            var response = await _operationService.ListAsync(request);
            return CreateResponse(response);
        }

        [HttpPost]
        [PermissionRequirement(Permissions.CanAddOperations)]
        public async Task<ResultResponse<int>> Add([FromBody] AddOperationRequest request)
        {
            var id = await _operationService.AddAsync(request);
            return CreateResponse(new ResultResponse<int> {Result = id});
        }

        [HttpPut]
        [PermissionRequirement(Permissions.CanEditOperations)]
        public async Task<ResultResponse<int>> Edit([FromBody] EditOperationRequest request)
        {
            var id = await _operationService.EditAsync(request);
            return CreateResponse(new ResultResponse<int> {Result = id});
        }

        [HttpGet("{id}")]
        [PermissionRequirement(Permissions.CanViewOperations)]
        public async Task<ResultResponse<OperationDto>> Edit([FromRoute] int id)
        {
            var request = new GetOperationRequest {Id = id};
            var categoryDto = await _operationService.GetAsync(request);
            return CreateResponse(new ResultResponse<OperationDto> {Result = categoryDto});
        }

        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanDeleteOperations)]
        public async Task<BaseResponse> Delete([FromRoute] int id)
        {
            var request = new DeleteOperationRequest {Id = id};
            await _operationService.DeleteAsync(request);
            return CreateResponse(new BaseResponse());
        }
    }
}