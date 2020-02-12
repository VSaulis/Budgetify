using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.User;
using Budget.Dtos.User;

namespace Budget.Models.Services
{
    public interface IUserService
    {
        Task<BaseResponse> AddAsync(AddUserRequest request);
        Task<BaseResponse> EditAsync(EditUserRequest request);
        Task<BaseResponse> HardDeleteAsync(int id);
        Task<BaseResponse> DeleteAsync(int id);
        Task<BaseResponse> DeleteListAsync(DeleteUsersRequest request);
        Task<ResultResponse<UserDto>> GetAsync(int id);
        Task<ListResponse<UsersListItemDto>> ListAsync(ListUsersRequest request);
    }
}