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



    public async Task<bool> ClearAllAsync(string userId, CancellationToken cancellationToken = default)
    {
        var result = await _cartCollection.DeleteManyAsync(
            cartProduct => cartProduct.UserId == userId,
            cancellationToken
        );
        return result.DeletedCount > 0;
    }

    public async Task<Cart?> DeleteByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        return await _cartCollection.FindOneAndDeleteAsync(
            cartProduct => cartProduct.Id == id,
            cancellationToken: cancellationToken
        );
    }

    public async Task<List<CartProductWithDetails>> GetAllByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        var filter = Builders<Cart>.Filter.Eq(cartProduct => cartProduct.UserId, userId);
        return await BuildCartProductWithDetailsAggregation(filter).ToListAsync(cancellationToken);
    }

    public async Task<Cart?> GetByProductIdAndUserId(string productId, string userId, CancellationToken cancellationToken = default)
    {
        return await _cartCollection.Find(
                cartProduct => cartProduct.ProductId == productId && cartProduct.UserId == userId
            )
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<CartProductWithDetails> InsertAsync(CreateCartProductDto createCartProductDto, CancellationToken cancellationToken = default)
    {
        var cartProduct = new Cart
        {
            ProductId = createCartProductDto.ProductId,
            UserId = createCartProductDto.UserId!,
            Quantity = createCartProductDto.Quantity,
            CreatedAt = DateTime.UtcNow
        };

        await _cartCollection.InsertOneAsync(cartProduct, cancellationToken: cancellationToken);

        var cartProductWithDetails = await GetCartProductWithDetails(cartProduct.Id, cancellationToken);

        return cartProductWithDetails!;
    }

    public async Task<CartProductWithDetails?> UpdateAsync(string id, UpdateCartProductDto updateCartProductDto, CancellationToken cancellationToken = default)
    {
        var filter = Builders<Cart>.Filter.Eq(cartProduct => cartProduct.Id, id);
        var update = Builders<Cart>.Update
            .Set(cartProduct => cartProduct.Quantity, updateCartProductDto.Quantity);

        var options = new FindOneAndUpdateOptions<Cart>
        {
            ReturnDocument = ReturnDocument.After
        };

        var cartProduct = await _cartCollection.FindOneAndUpdateAsync(
            filter,
            update,
            options,
            cancellationToken
        );

        return (cartProduct is null || string.IsNullOrEmpty(cartProduct.Id))
            ? null
            : await GetCartProductWithDetails(cartProduct.Id, cancellationToken);
    }

    private async Task<CartProductWithDetails?> GetCartProductWithDetails(string id, CancellationToken cancellationToken = default)
    {
        var filter = Builders<Cart>.Filter.Eq(c => c.Id, id);
        return await BuildCartProductWithDetailsAggregation(filter).FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<CartProductWithDetails?> GetCartProductWithDetails(string id)
    {
        var filter = Builders<Cart>.Filter.Eq(c => c.Id, id);
        return await BuildCartProductWithDetailsAggregation(filter).FirstOrDefaultAsync();
    }

    private IAggregateFluent<CartProductWithDetails> BuildCartProductWithDetailsAggregation(FilterDefinition<Cart> filter)
    {
        return _cartCollection.Aggregate()
            .Match(filter)
            .Lookup<Cart, Product, CartProductWithDetails>(
                _productsCollection,
                c => c.ProductId,
                p => p.Id,
                result => result.Product
            )
            .Unwind(c => c.Product)
            .As<CartProductWithDetails>();
    }
}
