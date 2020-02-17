using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Operation;
using Budget.Dtos.Operation;

namespace Budget.Models.Services
{
    public interface IOperationService
    {
        Task<BaseResponse> AddAsync(AddOperationRequest request);
        Task<BaseResponse> EditAsync(EditOperationRequest request);
        Task<BaseResponse> DeleteAsync(int id);
        Task<ResultResponse<OperationDto>> GetAsync(int id);
        Task<BaseResponse> DeleteListAsync(DeleteOperationsRequest request);
        Task<ListResponse<OperationsListItemDto>> ListAsync(ListOperationsRequest request);
    }
}