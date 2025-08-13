using System;
using Application.Aggregates;
using Application.DTOs.Cart;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface ICartRepository
{
    Task<Cart> InsertAsync(CreateCartProductDto createCartProductDto);
    Task<List<CartProductWithDetails>> GetAllByUserIdAsync(string userId);
    Task<Cart?> GetByProductIdAndUserId(string productId, string userId);
    Task<Cart> UpdateAsync(string id, UpdateCartProductDto updateCartProductDto);
    Task<bool> ClearAllAsync(string userId);
    Task<Cart?> DeleteAsync(string id);
}
