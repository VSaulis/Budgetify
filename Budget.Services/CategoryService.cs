using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Dtos.Category;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Budget.System.Helpers;

namespace Budget.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public async Task<int> AddAsync(AddCategoryRequest request)
        {
            var category = _mapper.Map<AddCategoryRequest, Category>(request);
            await _categoryRepository.AddAsync(category);
            return category.Id;
        }

        public async Task<int> EditAsync(EditCategoryRequest request)
        {
            var category = await _categoryRepository.GetAsync(category => category.Id == request.Id);
            category.Name = request.Name;
            await _categoryRepository.UpdateAsync(category);
            return category.Id;
        }

        public async Task DeleteAsync(DeleteCategoryRequest request)
        {
            var category = await _categoryRepository.GetAsync(category => category.Id == request.Id);
            await _categoryRepository.DeleteAsync(category);
        }

        public async Task<CategoryDto> GetAsync(GetCategoryRequest request)
        {
            var category = await _categoryRepository.GetAsync(category => category.Id == request.Id);
            return _mapper.Map<Category, CategoryDto>(category);
        }

        public async Task<ListResponse<CategoriesListItemDto>> ListAsync(ListCategoriesRequest request)
        {
            var paging = ListHelper.FormatPaging(request);
            var sort = ListHelper.FormatSort<Category>(request);

            var categories = await _categoryRepository.GetListAsync(null, sort, paging);
            var categoriesCount = await _categoryRepository.CountAsync(null);

            return new ListResponse<CategoriesListItemDto>
            {
                Result = _mapper.Map<List<Category>, List<CategoriesListItemDto>>(categories),
                Count = categoriesCount
            };
        }
    }
}