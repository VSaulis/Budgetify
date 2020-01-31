using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Category;
using Budget.Dtos.Category;
using Budget.Models.Services;
using Budget.System.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [PermissionRequirement(Permissions.CanViewCategories)]
        public async Task<ListResponse<CategoriesListItemDto>> List([FromQuery] ListCategoriesRequest request)
        {
            var response = await _categoryService.ListAsync(request);
            return CreateResponse(response);
        }

        [HttpPost]
        [PermissionRequirement(Permissions.CanAddCategories)]
        public async Task<ResultResponse<int>> Add([FromBody] AddCategoryRequest request)
        {
            var id = await _categoryService.AddAsync(request);
            return CreateResponse(new ResultResponse<int> {Result = id});
        }

        [HttpPut]
        [PermissionRequirement(Permissions.CanEditCategories)]
        public async Task<ResultResponse<int>> Edit([FromBody] EditCategoryRequest request)
        {
            var id = await _categoryService.EditAsync(request);
            return CreateResponse(new ResultResponse<int> {Result = id});
        }

        [HttpGet("{id}")]
        [PermissionRequirement(Permissions.CanViewCategories)]
        public async Task<ResultResponse<CategoryDto>> Edit([FromRoute] int id)
        {
            var request = new GetCategoryRequest {Id = id};
            var categoryDto = await _categoryService.GetAsync(request);
            return CreateResponse(new ResultResponse<CategoryDto> {Result = categoryDto});
        }

        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanDeleteCategories)]
        public async Task<BaseResponse> Delete([FromRoute] int id)
        {
            var request = new DeleteCategoryRequest {Id = id};
            await _categoryService.DeleteAsync(request);
            return CreateResponse(new BaseResponse());
        }
    }
}