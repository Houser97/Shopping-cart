using Application.DTOs.Products;
using Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(ProductsService productsService) : ControllerBase
    {
        private readonly ProductsService _productsService = productsService;

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetProducts()
        {
            var result = await _productsService.GetProductsAsync();

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProductById(string id)
        {
            var result = await _productsService.GetProductById(id);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }
    }
}
