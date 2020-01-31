using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Authentication;
using Budget.Dtos.Authentication;
using Budget.Models.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : BaseController
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }
        
        [Route("login")]
        [HttpPost]
        public async Task<ResultResponse<LoggedUserDto>> Login([FromBody] LoginRequest request)
        {
            var loggedUserDto = await _authenticationService.LoginAsync(request);
            var response = new ResultResponse<LoggedUserDto>{Result = loggedUserDto};
            return CreateResponse(response);
        }

        [Route("register")]
        [HttpPost]
        public async Task<BaseResponse> Register([FromBody] RegisterRequest request)
        {
            var userId = await _authenticationService.RegisterAsync(request);
            var response = new ResultResponse<int>{Result = userId};
            return CreateResponse(response);
        }
        
        [Route("logged-user")]
        [Authorize]
        [HttpGet]
        public async Task<ResultResponse<LoggedUserDto>> Get()
        {
            var loggedUserDto = await _authenticationService.GetLoggedUserAsync();
            var response = new ResultResponse<LoggedUserDto>{Result = loggedUserDto};
            return CreateResponse(response);
        }
        
        [Route("refresh-token")]
        [HttpPost]
        public async Task<ResultResponse<LoggedUserDto>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var loggedUserDto = await _authenticationService.RefreshTokenAsync(request);
            var response = new ResultResponse<LoggedUserDto>{Result = loggedUserDto};
            return CreateResponse(response);
        }
    }
}