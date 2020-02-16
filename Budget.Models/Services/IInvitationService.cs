using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Invitation;

namespace Budget.Models.Services
{
    public interface IInvitationService
    {
        Task<BaseResponse> AddAsync(AddInvitationRequest request);
        Task<BaseResponse> RevokeAsync(int id);
    }
}