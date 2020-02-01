using System.Threading.Tasks;
using Budget.Contracts.Profile;
using Budget.Dtos.Profile;

namespace Budget.Models.Services
{
    public interface IProfileService
    {
        Task<ProfileDto> GetAsync();
        Task<int> EditAsync(EditProfileRequest request);
    }
}