using System;
using Application.Core;
using Application.DTOs.Cart;

namespace Application.Interfaces.Services;

public interface ICartService
{
    Task<Result<List<CartProductDto>>> GetUserCartProducts(CancellationToken cancellationToken = default);
    Task<Result<CartProductDto>> CreateCartProduct(CreateCartProductDto createCartProductDto, CancellationToken cancellationToken = default);
    Task<Result<CartProductDto>> UpdateCartProduct(string id, UpdateCartProductDto updateCartProductDto, CancellationToken cancellationToken = default);
    Task<Result<CartProductDto>> DeleteCartProduct(string id, CancellationToken cancellationToken = default);
    Task<Result<bool>> ClearUserCart(CancellationToken cancellationToken = default);
}
