using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Authentication;
using Budget.Dtos.Authentication;

namespace Budget.Models.Services
{
    public interface IAuthenticationService
    {
        Task<ResultResponse<LoggedUserDto>> LoginAsync(LoginRequest request);
        Task<ResultResponse<LoggedUserDto>> GetLoggedUserDtoAsync(string refreshToken = null);
        Task<LoggedUser> GetLoggedUserAsync(string refreshToken = null);
        Task<ResultResponse<LoggedUserDto>> RefreshTokenAsync(RefreshTokenRequest request);
        Task<BaseResponse> RegisterAsync(RegisterRequest request);
    }
}