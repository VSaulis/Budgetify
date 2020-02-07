using System.Threading.Tasks;
using Budget.Contracts.Notification;
using Budget.Contracts.Operation;
using Budget.Models.Services;
using Budget.System.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> List([FromQuery] ListNotificationsRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());
            
            var response = await _notificationService.ListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
    }
}