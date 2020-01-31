using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.User;
using Budget.Dtos.User;
using Budget.Models.Services;
using Budget.System.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        [PermissionRequirement(Permissions.CanViewUsers)]
        public async Task<ListResponse<UsersListItemDto>> List([FromQuery] ListUsersRequest request)
        {
            var response = await _userService.ListAsync(request);
            return CreateResponse(response);
        }
        
        [HttpPost]
        [PermissionRequirement(Permissions.CanAddUsers)]
        public async Task<ResultResponse<int>> Add([FromBody] AddUserRequest request)
        {
            var id = await _userService.AddAsync(request);
            return CreateResponse(new ResultResponse<int>{Result = id});
        }
        
        [HttpPut]
        [PermissionRequirement(Permissions.CanEditUsers)]
        public async Task<ResultResponse<int>> Edit([FromBody] EditUserRequest request)
        {
            var id = await _userService.EditAsync(request);
            return CreateResponse(new ResultResponse<int>{Result = id});
        }
        
        [HttpGet("{id}")]
        [PermissionRequirement(Permissions.CanViewUsers)]
        public async Task<ResultResponse<UserDto>> Edit([FromRoute] int id)
        {
            var request = new GetUserRequest {Id = id};
            var userDto = await _userService.GetAsync(request);
            return CreateResponse(new ResultResponse<UserDto>{Result = userDto});
        }
        
        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanDeleteUsers)]
        public async Task<BaseResponse> Delete([FromRoute] int id)
        {
            var request = new DeleteUserRequest {Id = id};
            await _userService.DeleteAsync(request);
            return CreateResponse(new BaseResponse());
        }
    }
}