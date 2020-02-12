using System.Threading.Tasks;
using Budget.Constants.Enums;
using Budget.Contracts.Category;
using Budget.Models.Services;
using Budget.System.Attributes;
using Budget.System.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Budget.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [PermissionRequirement(Permissions.CanViewCategories)]
        public async Task<IActionResult> List([FromQuery] ListCategoriesRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _categoryService.ListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPost]
        [PermissionRequirement(Permissions.CanAddCategories)]
        public async Task<IActionResult> Add([FromBody] AddCategoryRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _categoryService.AddAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpPut]
        [PermissionRequirement(Permissions.CanEditCategories)]
        public async Task<IActionResult> Edit([FromBody] EditCategoryRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _categoryService.EditAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [PermissionRequirement(Permissions.CanViewCategories)]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var response = await _categoryService.GetAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        [PermissionRequirement(Permissions.CanDeleteCategories)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var response = await _categoryService.DeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
        
        [HttpDelete("{id}/hard")]
        [PermissionRequirement(Permissions.CanHardDeleteOperations)]
        public async Task<IActionResult> HardDelete([FromRoute] int id)
        {
            var response = await _categoryService.HardDeleteAsync(id);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }

        [HttpDelete]
        [PermissionRequirement(Permissions.CanDeleteCategories)]
        public async Task<IActionResult> Delete([FromRoute] DeleteCategoriesRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState.GetErrorMessages());

            var response = await _categoryService.DeleteListAsync(request);
            if (!response.IsValid) return BadRequest(response.Message);
            return Ok(response);
        }
    }
}