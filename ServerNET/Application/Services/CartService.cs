using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Cart;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Services;

public class CartService(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings,
    IServiceHelper<CartService> serviceHelper,
    IMapper mapper
) : ICartService
{

    private readonly IMongoCollection<Cart> _cartCollection =
        dbContext.Database.GetCollection<Cart>(settings.Value.CartCollectionName);
    private readonly IMongoCollection<Product> _productCollection =
        dbContext.Database.GetCollection<Product>(settings.Value.ProductsCollectionName);
    private readonly IServiceHelper<CartService> _serviceHelper = serviceHelper;
    private readonly IMapper _mapper = mapper;

    public async Task<Result<bool>> ClearUserCart(string userId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            await _cartCollection.DeleteManyAsync(cartProduct => cartProduct.UserId == userId);
            return Result<bool>.Success(true);
        });
    }

    public async Task<Result<CartProductDto>> CreateCartProduct(CreateCartProductDto createCartProductDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productId = createCartProductDto.ProductId;
            var userId = createCartProductDto.UserId;

            var cartProductExists = await _cartCollection.Find(
                cartProduct => cartProduct.ProductId == productId && cartProduct.UserId == userId
            ).FirstOrDefaultAsync();

            if (cartProductExists != null)
                return Result<CartProductDto>.Failure("Product already in cart", 400);

            var cartProduct = new Cart
            {
                ProductId = productId,
                UserId = userId,
                Quantity = createCartProductDto.Quantity,
                CreatedAt = DateTime.UtcNow
            };

            await _cartCollection.InsertOneAsync(cartProduct);

            var cartProductDto = _mapper.Map<CartProductDto>(cartProduct);

            return Result<CartProductDto>.Success(cartProductDto);
        });
    }

    public async Task<Result<CartProductDto>> DeleteCartProduct(string id)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var cartProduct = await _cartCollection.FindOneAndDeleteAsync(cartProduct => cartProduct.Id == id);

            if (cartProduct == null)
                return Result<CartProductDto>.Failure($"Cart product with id: {id} could not be deleted", 400);

            var cartProductDto = _mapper.Map<CartProductDto>(cartProduct);

            return Result<CartProductDto>.Success(cartProductDto);

        });
    }

    public async Task<Result<List<CartProductDto>>> GetUserCartProducts(string userId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var filter = Builders<Cart>.Filter.Eq(cartProduct => cartProduct.UserId, userId);

            var aggregation = _cartCollection.Aggregate()
                .Match(filter)
                .Lookup<Cart, Product, CartProductWithDetails>(
                    _productCollection,
                    cartProduct => cartProduct.ProductId,
                    product => product.Id,
                    result => result.Product
                )
                .Unwind(cartProduct => cartProduct.Product)
                .As<CartProductWithDetails>();

            var result = await aggregation.ToListAsync();

            var cartProductDtos = _mapper.Map<List<CartProductDto>>(result);

            return Result<List<CartProductDto>>.Success(cartProductDtos);
        });
    }

    public async Task<Result<CartProductDto>> UpdateCartProduct(string id, UpdateCartProductDto updateCartProductDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var filter = Builders<Cart>.Filter.Eq(cartProduct => cartProduct.Id, id);
            var update = Builders<Cart>.Update
                .Set(cartProduct => cartProduct.Quantity, updateCartProductDto.Quantity);

            var options = new FindOneAndUpdateOptions<Cart>
            {
                ReturnDocument = ReturnDocument.After
            };

            var updatedCartProduct = await _cartCollection.FindOneAndUpdateAsync(filter, update, options);

            if (updatedCartProduct == null)
                return Result<CartProductDto>.Failure($"Cart product with id: {id} could not be updated", 400);

            var cartProductDto = _mapper.Map<CartProductDto>(updatedCartProduct);

            return Result<CartProductDto>.Success(cartProductDto);
        });
    }
}
