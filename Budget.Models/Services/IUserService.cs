using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.User;
using Budget.Dtos.User;

namespace Budget.Models.Services
{
    public interface IUserService
    {
        Task<int> AddAsync(AddUserRequest request);
        Task<int> EditAsync(EditUserRequest request);
        Task DeleteAsync(DeleteUserRequest request);
        Task<UserDto> GetAsync(GetUserRequest request);
        Task<ListResponse<UsersListItemDto>> ListAsync(ListUsersRequest request);
    }
}