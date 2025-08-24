using Application.DTOs.Cart;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(
        ICartService cartService
    ) : ControllerBase
    {

        private readonly ICartService _cartService = cartService;

        [HttpGet]
        public async Task<ActionResult> GetUserCartProducts(CancellationToken cancellationToken)
        {
            var result = await _cartService.GetUserCartProducts(cancellationToken);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct([FromBody] CreateCartProductDto createCartProductDto, CancellationToken cancellationToken)
        {
            var result = await _cartService.CreateCartProduct(createCartProductDto, cancellationToken);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpDelete]
        public async Task<ActionResult> ClearCart(CancellationToken cancellationToken)
        {
            var result = await _cartService.ClearUserCart(cancellationToken);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpDelete("{cartProductId}")]
        public async Task<ActionResult> DeleteProduct(string cartProductId, CancellationToken cancellationToken)
        {
            var result = await _cartService.DeleteCartProduct(cartProductId, cancellationToken);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpPut("{cartProductId}")]
        public async Task<ActionResult> UpdateProduct(
            string cartProductId,
            [FromBody] UpdateCartProductDto updateCartProductDto,
            CancellationToken cancellationToken
        )
        {
            var result = await _cartService.UpdateCartProduct(cartProductId, updateCartProductDto, cancellationToken);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }
    }
}
