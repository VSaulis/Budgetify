using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts.Operation;
using Budget.Models.Services;
using Budget.System.Attributes;
using Budget.System.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperationsController : ControllerBase
    {
        private readonly IOperationService _operationService;

        public OperationsController(IOperationService operationService)
        {
            _operationService = operationService;
        }

        [HttpGet]
        [GroupPermissionRequirement(GroupPermissions.CanViewOperations)]
        public async Task<IActionResult> List([FromQuery] ListOperationsRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _operationService.ListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPost]
        [GroupPermissionRequirement(GroupPermissions.CanAddOperations)]
        public async Task<IActionResult> Add([FromBody] AddOperationRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _operationService.AddAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPut]
        [GroupPermissionRequirement(GroupPermissions.CanEditOperations)]
        public async Task<IActionResult> Edit([FromBody] EditOperationRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _operationService.EditAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [GroupPermissionRequirement(GroupPermissions.CanViewOperations)]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var response = await _operationService.GetAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        [GroupPermissionRequirement(GroupPermissions.CanDeleteOperations)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var response = await _operationService.DeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete("{id}/hard")]
        [GroupPermissionRequirement(GroupPermissions.CanHardDeleteOperations)]
        public async Task<IActionResult> HardDelete([FromRoute] int id)
        {
            var response = await _operationService.HardDeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete]
        [GroupPermissionRequirement(GroupPermissions.CanDeleteOperations)]
        public async Task<IActionResult> Delete([FromRoute] DeleteOperationsRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _operationService.DeleteListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
    }
}