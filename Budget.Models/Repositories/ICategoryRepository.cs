using System.Threading.Tasks;
using Budget.Models.Filters;

namespace Budget.Models.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category, CategoriesFilter>
    {
        Task<decimal> TotalAsync(CategoriesFilter filter = null);
    }
}