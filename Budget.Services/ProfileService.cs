using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts.Profile;
using Budget.Dtos.Profile;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;

namespace Budget.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public ProfileService(IAuthenticationService authenticationService, IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _authenticationService = authenticationService;
        }
        
        public async Task<ProfileDto> GetAsync()
        {
            var loggedUserDto = await _authenticationService.GetLoggedUserAsync();
            var user = await _userRepository.GetAsync(user => user.Id == loggedUserDto.UserId);
            return _mapper.Map<User, ProfileDto>(user);
        }

        public async Task<int> EditAsync(EditProfileRequest request)
        {
            var loggedUserDto = await _authenticationService.GetLoggedUserAsync();
            var user = await _userRepository.GetAsync(user => user.Id == loggedUserDto.UserId);
            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            await _userRepository.UpdateAsync(user);
            return user.Id;
        }
    }
}