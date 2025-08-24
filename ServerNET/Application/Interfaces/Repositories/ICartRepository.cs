using System;
using Application.Aggregates;
using Application.DTOs.Cart;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface ICartRepository
{
    Task<CartProductWithDetails> InsertAsync(CreateCartProductDto createCartProductDto, CancellationToken cancellationToken = default);
    Task<List<CartProductWithDetails>> GetAllByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    Task<Cart?> GetByProductIdAndUserId(string productId, string userId, CancellationToken cancellationToken = default);
    Task<CartProductWithDetails?> UpdateAsync(string id, UpdateCartProductDto updateCartProductDto, CancellationToken cancellationToken = default);
    Task<bool> ClearAllAsync(string userId, CancellationToken cancellationToken = default);
    Task<Cart?> DeleteByIdAsync(string id, CancellationToken cancellationToken = default);
}
