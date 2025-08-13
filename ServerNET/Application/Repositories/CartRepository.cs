using System;
using Application.Aggregates;
using Application.DTOs.Cart;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Repositories;

public class CartRepository(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings
) : ICartRepository
{

    private readonly IMongoCollection<Cart> _cartCollection =
        dbContext.Database.GetCollection<Cart>(settings.Value.CartCollectionName);

    private readonly IMongoCollection<Product> _productsCollection =
        dbContext.Database.GetCollection<Product>(settings.Value.ProductsCollectionName);

    public async Task<bool> ClearAllAsync(string userId)
    {
        await _cartCollection.DeleteManyAsync(cartProduct => cartProduct.UserId == userId);
        return true;
    }

    public async Task<Cart?> DeleteAsync(string id)
    {
        return await _cartCollection.FindOneAndDeleteAsync(cartProduct => cartProduct.Id == id);
    }

    public async Task<List<CartProductWithDetails>> GetAllByUserIdAsync(string userId)
    {
        var filter = Builders<Cart>.Filter.Eq(cartProduct => cartProduct.UserId, userId);

        var aggregation = _cartCollection.Aggregate()
            .Match(filter)
            .Lookup<Cart, Product, CartProductWithDetails>(
                _productsCollection,
                cartProduct => cartProduct.ProductId,
                product => product.Id,
                result => result.Product
            )
            .Unwind(cartProduct => cartProduct.Product)
            .As<CartProductWithDetails>();

        return await aggregation.ToListAsync();
    }

    public async Task<Cart?> GetByProductIdAndUserId(string productId, string userId)
    {
        return await _cartCollection.Find(
                cartProduct => cartProduct.ProductId == productId && cartProduct.UserId == userId
            ).FirstOrDefaultAsync();
    }

    public async Task<Cart> InsertAsync(CreateCartProductDto createCartProductDto)
    {
        var cartProduct = new Cart
        {
            ProductId = createCartProductDto.ProductId,
            UserId = createCartProductDto.UserId,
            Quantity = createCartProductDto.Quantity,
            CreatedAt = DateTime.UtcNow
        };

        await _cartCollection.InsertOneAsync(cartProduct);

        return cartProduct;
    }

    public async Task<Cart> UpdateAsync(string id, UpdateCartProductDto updateCartProductDto)
    {
        var filter = Builders<Cart>.Filter.Eq(cartProduct => cartProduct.Id, id);
        var update = Builders<Cart>.Update
            .Set(cartProduct => cartProduct.Quantity, updateCartProductDto.Quantity);

        var options = new FindOneAndUpdateOptions<Cart>
        {
            ReturnDocument = ReturnDocument.After
        };

        return await _cartCollection.FindOneAndUpdateAsync(filter, update, options);

    }
}
