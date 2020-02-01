using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Constants.Enums;
using Budget.Contracts.Authentication;
using Budget.Dtos.Authentication;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Budget.System.Exceptions;
using Microsoft.AspNetCore.Http;
using NotImplementedException = System.NotImplementedException;

namespace Budget.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly ITokenService _tokenService;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;
        
        public AuthenticationService(IUserRepository userRepository, IEncryptionService encryptionService, ITokenService tokenService, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContext = httpContextAccessor.HttpContext;
            _tokenService = tokenService;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
        }
        
        public async Task<LoggedUserDto> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Email == request.Email);
            if (user == null) throw new BadRequestException();
            if (!_encryptionService.VerifyHash(request.Password, user.PasswordHash, user.PasswordSalt)) throw new BadRequestException();

            user.RefreshToken = _tokenService.GenerateRefreshToken();
            await _userRepository.UpdateAsync(user);

            var token = _tokenService.GenerateToken(user.Id);
            
            return GetLoggedUserDto(token, user);
        }

        public async Task ChangePasswordAsync(ChangePasswordRequest request)
        {
            throw new NotImplementedException();
        }

        public async Task<LoggedUserDto> GetLoggedUserAsync(string refreshToken = null)
        {
            if (!_httpContext.User.Identity.IsAuthenticated) return null;
            
            var id = _httpContext.User.Claims.FirstOrDefault(claim => claim.Type == "Id")?.Value;
            if (id == null) return null;

            var user = await _userRepository.GetAsync(user => user.Id == int.Parse(id));
            if (user == null || refreshToken != null && user.RefreshToken != refreshToken) return null;

            if (!_httpContext.Request.Headers.ContainsKey("Authorization") || !_httpContext.Request.Headers["Authorization"][0].StartsWith("Bearer ")) return null;
            var token = _httpContext.Request.Headers["Authorization"][0].Substring("Bearer ".Length);

            return GetLoggedUserDto(token, user);
        }

        public async Task<LoggedUserDto> RefreshTokenAsync(RefreshTokenRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.RefreshToken == request.RefreshToken);
            if (user == null) throw new UnauthorizedException();
            
            user.RefreshToken = _tokenService.GenerateRefreshToken();
            await _userRepository.UpdateAsync(user);
            
            var token = _tokenService.GenerateToken(user.Id);
            
            return GetLoggedUserDto(token, user);
        }

        public async Task<int> RegisterAsync(RegisterRequest request)
        {
            var user = await _userRepository.GetAsync(user => user.Email == request.Email);
            if (user != null) throw new BadRequestException();
            
            var passwordSalt = _encryptionService.CreateSalt();
            var passwordHash = _encryptionService.CreateHash(request.Password, passwordSalt);
            var roles = new List<Roles> {Roles.Owner};
            user = new User {Email = request.Email, PasswordHash = passwordHash, PasswordSalt = passwordSalt, Roles = roles};
            await _userRepository.AddAsync(user);
            return user.Id;
        }

        private LoggedUserDto GetLoggedUserDto(string token, User user)
        {
            var loggedUser = _mapper.Map<User, LoggedUser>(user);
            loggedUser.Token = token;
            return _mapper.Map<LoggedUser, LoggedUserDto>(loggedUser);
        }
    }
}