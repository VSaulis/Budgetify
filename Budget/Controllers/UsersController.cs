using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts.User;
using Budget.Models.Services;
using Budget.System.Attributes;
using Budget.System.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [PermissionRequirement(Permissions.CanViewUsers)]
        public async Task<IActionResult> List([FromQuery] ListUsersRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _userService.ListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPost]
        [PermissionRequirement(Permissions.CanAddUsers)]
        public async Task<IActionResult> Add([FromBody] AddUserRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _userService.AddAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPut]
        [PermissionRequirement(Permissions.CanEditUsers)]
        public async Task<IActionResult> Edit([FromBody] EditUserRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _userService.EditAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [PermissionRequirement(Permissions.CanViewUsers)]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var response = await _userService.GetAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanDeleteUsers)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _userService.DeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
        
        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanHardDeleteUsers)]
        public async Task<IActionResult> HardDelete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _userService.HardDeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete]
        [PermissionRequirement(Permissions.CanDeleteUsers)]
        public async Task<IActionResult> Delete([FromRoute] DeleteUsersRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _userService.DeleteListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
    }
}