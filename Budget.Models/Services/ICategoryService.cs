using System.Threading.Tasks;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Dtos.Category;

namespace Budget.Models.Services
{
    public interface ICategoryService
    {
        Task<BaseResponse> AddAsync(AddCategoryRequest request);
        Task<BaseResponse> EditAsync(EditCategoryRequest request);
        Task<BaseResponse> DeleteAsync(int id);
        Task<BaseResponse> DeleteListAsync(DeleteCategoriesRequest request);
        Task<ResultResponse<CategoryDto>> GetAsync(int id);
        Task<ListResponse<CategoriesListItemDto>> ListAsync(ListCategoriesRequest request);
    }
}