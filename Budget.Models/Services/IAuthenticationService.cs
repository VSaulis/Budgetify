using System.Threading.Tasks;
using Budget.Contracts.Authentication;
using Budget.Dtos.Authentication;

namespace Budget.Models.Services
{
    public interface IAuthenticationService
    {
        Task<LoggedUserDto> LoginAsync(LoginRequest request);
        Task ChangePasswordAsync(ChangePasswordRequest request);
        Task<LoggedUserDto> GetLoggedUserAsync(string refreshToken = null);
        Task<LoggedUserDto> RefreshTokenAsync(RefreshTokenRequest request);
        Task<int> RegisterAsync(RegisterRequest request);
    }
}