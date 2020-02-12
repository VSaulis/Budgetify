using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Operation;
using Budget.Dtos.Operation;
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
        [PermissionRequirement(Permissions.CanViewOperations)]
        public async Task<IActionResult> List([FromQuery] ListOperationsRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());
            
            var response = await _operationService.ListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPost]
        [PermissionRequirement(Permissions.CanAddOperations)]
        public async Task<IActionResult> Add([FromBody] AddOperationRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());
            
            var response = await _operationService.AddAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPut]
        [PermissionRequirement(Permissions.CanEditOperations)]
        public async Task<IActionResult> Edit([FromBody] EditOperationRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());
            
            var response = await _operationService.EditAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [PermissionRequirement(Permissions.CanViewOperations)]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var response = await _operationService.GetAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanDeleteOperations)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var response = await _operationService.DeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
        
        [HttpDelete("{id}/hard")]
        [PermissionRequirement(Permissions.CanHardDeleteOperations)]
        public async Task<IActionResult> HardDelete([FromRoute] int id)
        {
            var response = await _operationService.HardDeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
        
        [HttpDelete]
        [PermissionRequirement(Permissions.CanDeleteOperations)]
        public async Task<IActionResult> Delete([FromRoute] DeleteOperationsRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());
            
            var response = await _operationService.DeleteListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
    }
}