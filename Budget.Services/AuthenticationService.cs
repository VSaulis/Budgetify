using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Authentication;
using Budget.Dtos.Authentication;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Microsoft.AspNetCore.Http;

namespace Budget.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly ITokenService _tokenService;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        
        public AuthenticationService
        (
            IUnitOfWork unitOfWork, 
            IUserRepository userRepository, 
            IEncryptionService encryptionService, 
            ITokenService tokenService, 
            IHttpContextAccessor httpContextAccessor, 
            IMapper mapper
        )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _httpContext = httpContextAccessor.HttpContext;
            _tokenService = tokenService;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
        }
        
        public async Task<ResultResponse<LoggedUserDto>> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Email == request.Email);
            if (user == null) return new ResultResponse<LoggedUserDto>("User is not found");

            if (!_encryptionService.VerifyHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return new ResultResponse<LoggedUserDto>("Invalid credentials");
            }

            user.RefreshToken = _tokenService.GenerateRefreshToken();
            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();

            var token = _tokenService.GenerateToken(user.Id);
            var loggedUser = _mapper.Map<User, LoggedUser>(user);
            var loggedUserDto = _mapper.Map<LoggedUser, LoggedUserDto>(loggedUser);
            loggedUserDto.Token = token;
            return new ResultResponse<LoggedUserDto>(loggedUserDto);
        }

        public async Task<ResultResponse<LoggedUserDto>> GetLoggedUserDtoAsync(string refreshToken = null)
        {
            var loggedUser = await GetLoggedUserAsync();
            var loggedUserDto = _mapper.Map<LoggedUser, LoggedUserDto>(loggedUser);
            return new ResultResponse<LoggedUserDto>(loggedUserDto);
        }

        public async Task<LoggedUser> GetLoggedUserAsync(string refreshToken = null)
        {
            if (!_httpContext.User.Identity.IsAuthenticated) return null;
            
            var id = _httpContext.User.Claims.FirstOrDefault(claim => claim.Type == "Id")?.Value;
            if (id == null) return null;

            var user = await _userRepository.GetAsync(user => user.Id == int.Parse(id));
            if (user == null || refreshToken != null && user.RefreshToken != refreshToken) return null;

            if (!_httpContext.Request.Headers.ContainsKey("Authorization") || !_httpContext.Request.Headers["Authorization"][0].StartsWith("Bearer ")) return null;
            var token = _httpContext.Request.Headers["Authorization"][0].Substring("Bearer ".Length);

            var loggedUser = _mapper.Map<User, LoggedUser>(user);
            loggedUser.Token = token;
            return loggedUser;
        }

        public async Task<ResultResponse<LoggedUserDto>> RefreshTokenAsync(RefreshTokenRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.RefreshToken == request.RefreshToken);
            if (user == null) return new ResultResponse<LoggedUserDto>("User is not found");
            
            user.RefreshToken = _tokenService.GenerateRefreshToken();
            _userRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
            
            var token = _tokenService.GenerateToken(user.Id);
            var loggedUser = await GetLoggedUserAsync();
            loggedUser.Token = token;
            var loggedUserDto = _mapper.Map<LoggedUser, LoggedUserDto>(loggedUser);
            return new ResultResponse<LoggedUserDto>(loggedUserDto);
        }

        public async Task<BaseResponse> RegisterAsync(RegisterRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Email == request.Email);
            if (user != null) return new BaseResponse("User with this email is already exist");
            
            var passwordSalt = _encryptionService.CreateSalt();
            var passwordHash = _encryptionService.CreateHash(request.Password, passwordSalt);
            user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email, 
                PasswordHash = passwordHash, 
                PasswordSalt = passwordSalt
            };
            await _userRepository.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }
    }
}