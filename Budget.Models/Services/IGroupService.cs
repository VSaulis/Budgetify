using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Group;
using Budget.Dtos.Group;

namespace Budget.Models.Services
{
    public interface IGroupService
    {
        Task<BaseResponse> AddAsync(AddGroupRequest request);
        Task<BaseResponse> EditAsync(EditGroupRequest request);
        Task<ListResponse<GroupsListItemDto>> ListAsync(ListGroupsRequest request);
        Task<BaseResponse> DeleteAsync(int id);
        Task<ResultResponse<GroupDto>> GetAsync(int id);
    }
}