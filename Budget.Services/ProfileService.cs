using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts;
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
        private readonly IUnitOfWork _unitOfWork;

        public ProfileService(IAuthenticationService authenticationService, IMapper mapper, IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userRepository = userRepository;
            _authenticationService = authenticationService;
        }
        
        public async Task<ResultResponse<ProfileDto>> GetAsync()
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();
            var profileDto = _mapper.Map<User, ProfileDto>(loggedUser.User);
            return new ResultResponse<ProfileDto>(profileDto);
        }

        public async Task<BaseResponse> EditAsync(EditProfileRequest request)
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();
            var user = loggedUser.User;
            
            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            
            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }
    }
}