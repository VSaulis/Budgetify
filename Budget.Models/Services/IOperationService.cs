using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Operation;
using Budget.Dtos.Operation;

namespace Budget.Models.Services
{
    public interface IOperationService
    {
        Task<int> AddAsync(AddOperationRequest request);
        Task<int> EditAsync(EditOperationRequest request);
        Task DeleteAsync(DeleteOperationRequest request);
        Task<OperationDto> GetAsync(GetOperationRequest request);
        Task<ListResponse<OperationsListItemDto>> ListAsync(ListOperationsRequest request);
    }
}