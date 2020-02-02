using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Dtos.Category;

namespace Budget.Models.Services
{
    public interface ICategoryService
    {
        Task<int> AddAsync(AddCategoryRequest request);
        Task<int> EditAsync(EditCategoryRequest request);
        Task DeleteAsync(DeleteCategoryRequest request);
        Task DeleteListAsync(DeleteCategoriesRequest request);
        Task<CategoryDto> GetAsync(GetCategoryRequest request);
        Task<ListResponse<CategoriesListItemDto>> ListAsync(ListCategoriesRequest request);
    }
}