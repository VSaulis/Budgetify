using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts.Invitation;
using Budget.Models.Services;
using Budget.System.Attributes;
using Budget.System.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvitationController : ControllerBase
    {
        private readonly IInvitationService _invitationService;

        public InvitationController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }
        
        [HttpPost]
        [GroupPermissionRequirement(GroupPermissions.CanAddInvitations)]
        public async Task<IActionResult> Add([FromBody] AddInvitationRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _invitationService.AddAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
        
        [HttpPut("revoke/{id}")]
        [GroupPermissionRequirement(GroupPermissions.CanRevokeInvitations)]
        public async Task<IActionResult> Edit([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _invitationService.RevokeAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
    }
}