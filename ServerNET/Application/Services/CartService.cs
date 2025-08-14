using System;
using Application.Core;
using Application.DTOs.Cart;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using AutoMapper;
using MongoDB.Driver;

namespace Application.Services;

public class CartService(
    ICartRepository cartRepository,
    IServiceHelper<CartService> serviceHelper,
    IMapper mapper
) : ICartService
{

    private readonly ICartRepository _cartRepository = cartRepository;

    private readonly IServiceHelper<CartService> _serviceHelper = serviceHelper;
    private readonly IMapper _mapper = mapper;

    public async Task<Result<bool>> ClearUserCart(string userId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            await _cartRepository.DeleteAsync(userId);
            return Result<bool>.Success(true);
        });
    }

    public async Task<Result<CartProductDto>> CreateCartProduct(CreateCartProductDto createCartProductDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            try
            {
                var cartProduct = await _cartRepository.InsertAsync(createCartProductDto);
                var cartProductDto = _mapper.Map<CartProductDto>(cartProduct);
                return Result<CartProductDto>.Success(cartProductDto);
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                return Result<CartProductDto>.Failure("Product is already in the cart", 400);
            }
        });
    }

    public async Task<Result<CartProductDto>> DeleteCartProduct(string id)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var cartProduct = await _cartRepository.DeleteAsync(id);

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
            var result = await _cartRepository.GetAllByUserIdAsync(userId);

            var cartProductDtos = _mapper.Map<List<CartProductDto>>(result);

            return Result<List<CartProductDto>>.Success(cartProductDtos);
        });
    }

    public async Task<Result<CartProductDto>> UpdateCartProduct(string id, UpdateCartProductDto updateCartProductDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var updatedCartProduct = await _cartRepository.UpdateAsync(id, updateCartProductDto);

            if (updatedCartProduct == null)
                return Result<CartProductDto>.Failure($"Cart product with id: {id} could not be updated", 400);

            var cartProductDto = _mapper.Map<CartProductDto>(updatedCartProduct);

            return Result<CartProductDto>.Success(cartProductDto);
        });
    }
}
