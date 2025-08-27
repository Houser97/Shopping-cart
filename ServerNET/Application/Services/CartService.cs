using System;
using Application.Core;
using Application.DTOs.Cart;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using AutoMapper;
using MongoDB.Driver;

namespace Application.Services;

public class CartService(
    ICartRepository cartRepository,
    IServiceHelper<CartService> serviceHelper,
    IMapper mapper,
    IUserAccessor userAccessor
) : ICartService
{
    private readonly ICartRepository _cartRepository = cartRepository;
    private readonly IServiceHelper<CartService> _serviceHelper = serviceHelper;
    private readonly IMapper _mapper = mapper;
    private readonly IUserAccessor _userAccessor = userAccessor;

    public async Task<Result<bool>> ClearUserCart(CancellationToken cancellationToken = default)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var userId = _userAccessor.GetUserId();
            var result = await _cartRepository.ClearAllAsync(userId!, cancellationToken);
            return Result<bool>.Success(result);
        });
    }

    public async Task<Result<CartProductDto>> CreateCartProduct(CreateCartProductDto createCartProductDto, CancellationToken cancellationToken = default)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            try
            {
                createCartProductDto.UserId = _userAccessor.GetUserId();
                var cartProduct = await _cartRepository.InsertAsync(createCartProductDto, cancellationToken);
                var cartProductDto = _mapper.Map<CartProductDto>(cartProduct);
                return Result<CartProductDto>.Success(cartProductDto);
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                return Result<CartProductDto>.Failure("Product is already in the cart", 400);
            }
        });
    }

    public async Task<Result<CartProductDto>> DeleteCartProduct(string id, CancellationToken cancellationToken = default)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var cartProduct = await _cartRepository.DeleteByIdAsync(id, cancellationToken);

            if (cartProduct == null)
                return Result<CartProductDto>.Failure($"Cart product with id: {id} not found", 404);

            var cartProductDto = _mapper.Map<CartProductDto>(cartProduct);

            return Result<CartProductDto>.Success(cartProductDto);
        });
    }

    public async Task<Result<List<CartProductDto>>> GetUserCartProducts(CancellationToken cancellationToken = default)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var userId = _userAccessor.GetUserId();

            var result = await _cartRepository.GetAllByUserIdAsync(userId!, cancellationToken);

            var cartProductDtos = _mapper.Map<List<CartProductDto>>(result);

            return Result<List<CartProductDto>>.Success(cartProductDtos);
        });
    }

    public async Task<Result<CartProductDto>> UpdateCartProduct(string id, UpdateCartProductDto updateCartProductDto, CancellationToken cancellationToken = default)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var updatedCartProduct = await _cartRepository.UpdateAsync(id, updateCartProductDto, cancellationToken);

            if (updatedCartProduct == null)
                return Result<CartProductDto>.Failure($"Cart product with id: {id} could not be updated", 404);

            var cartProductDto = _mapper.Map<CartProductDto>(updatedCartProduct);

            return Result<CartProductDto>.Success(cartProductDto);
        });
    }
}
