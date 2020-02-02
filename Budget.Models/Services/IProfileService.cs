using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Profile;
using Budget.Dtos.Profile;

namespace Budget.Models.Services
{
    public interface IProfileService
    {
        Task<ResultResponse<ProfileDto>> GetAsync();
        Task<BaseResponse> EditAsync(EditProfileRequest request);
    }
}