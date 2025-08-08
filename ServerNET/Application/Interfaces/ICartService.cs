using System;
using Application.Core;
using Application.DTOs.Cart;

namespace Application.Interfaces;

public interface ICartService
{
    Task<Result<List<CartProductDto>>> GetUserCartProducts(string userId);
    Task<Result<CartProductDto>> CreateCartProduct(CreateCartProductDto createCartProductDto);
    Task<Result<CartProductDto>> UpdateCartProduct(string id, UpdateCartProductDto updateCartProductDto);
    Task<Result<CartProductDto>> DeleteCartProduct(string id);
    Task<Result<bool>> ClearUserCart(string userId);
}
