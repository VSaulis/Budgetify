﻿using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Dtos.Category;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Budget.System.Helpers;
using NotImplementedException = System.NotImplementedException;

namespace Budget.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IAuthenticationService authenticationService, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _authenticationService = authenticationService;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public async Task<BaseResponse> AddAsync(AddCategoryRequest request)
        {
            var loggedUser = await _authenticationService.GetLoggedUserAsync();
            var category = _mapper.Map<AddCategoryRequest, Category>(request);
            category.UserId = loggedUser.User.Id;
            await _categoryRepository.AddAsync(category);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> EditAsync(EditCategoryRequest request)
        {
            var category = await _categoryRepository.GetAsync(category => category.Id == request.Id);
            if (category == null) return new BaseResponse("Category is not found");
            
            category.Name = request.Name;
            _categoryRepository.Update(category);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> DeleteAsync(int id)
        {
            var category = await _categoryRepository.GetAsync(category => category.Id == id);
            if (category == null) return new BaseResponse("Category is not found");
            
            _categoryRepository.Delete(category);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> DeleteListAsync(DeleteCategoriesRequest request)
        {
            foreach (var categoryId in request.CategoriesIds)
            {
                var category = await _categoryRepository.GetAsync(category => category.Id == categoryId);
                if (category == null) return new BaseResponse("Category is not found");
                _categoryRepository.Delete(category);
            }
            
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ResultResponse<CategoryDto>> GetAsync(int id)
        {
            var category = await _categoryRepository.GetAsync(category => category.Id == id);
            if (category == null) return new ResultResponse<CategoryDto>("Category is not found");
            
            var categoryDto = _mapper.Map<Category, CategoryDto>(category);
            return new ResultResponse<CategoryDto>(categoryDto);
        }

        public async Task<ListResponse<CategoriesListItemDto>> ListAsync(ListCategoriesRequest request)
        {
            var paging = ListHelper.FormatPaging(request);
            var sort = ListHelper.FormatSort<Category>(request);

            var categories = await _categoryRepository.GetListAsync(null, sort, paging);
            var categoriesCount = await _categoryRepository.CountAsync(null);
            
            var categoriesDtosList = _mapper.Map<List<Category>, List<CategoriesListItemDto>>(categories);
            return new ListResponse<CategoriesListItemDto>(categoriesDtosList, categoriesCount);
        }
    }
}