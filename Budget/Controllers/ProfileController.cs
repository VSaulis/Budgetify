using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Profile;
using Budget.Dtos.Profile;
using Budget.Models.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : BaseController
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }
        
        [HttpGet]
        [Authorize]
        public async Task<ResultResponse<ProfileDto>> Get()
        {
            var profileDto = await _profileService.GetAsync();
            return CreateResponse(new ResultResponse<ProfileDto>{Result = profileDto});
        }
        
        [HttpPut]
        [Authorize]
        public async Task<ResultResponse<int>> Edit([FromBody] EditProfileRequest request)
        {
            var userId = await _profileService.EditAsync(request);
            return CreateResponse(new ResultResponse<int> {Result = userId});
        }
    }
}