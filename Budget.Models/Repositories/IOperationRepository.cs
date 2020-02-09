using System.Threading.Tasks;
using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface IOperationRepository : IBaseRepository<Operation, OperationsFilter>
    {
        Task<decimal> TotalAsync(OperationsFilter filter = null);
    }
}