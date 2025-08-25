using System;
using Application.Core;
using Application.DTOs.Products;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using AutoMapper;
namespace Application.Services;

public class ProductsService(
    IProductsRepository productsRepository,
    IMapper mapper,
    IServiceHelper<ProductsService> serviceHelper
) : IProductsService
{
    private readonly IServiceHelper<ProductsService> _serviceHelper = serviceHelper;
    private readonly IProductsRepository _productsRepository = productsRepository;

    public async Task<Result<ProductDto[]>> GetProductsAsync()
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await _productsRepository.GetProductsAsync();

            var productDtos = mapper.Map<ProductDto[]>(productWithReviews);
            return Result<ProductDto[]>.Success(productDtos);
        });
    }

    public async Task<Result<ProductDto>> GetProductById(string id)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await _productsRepository.GetProductByIdAsync(id);

            if (productWithReviews is null)
                return Result<ProductDto>.Failure($"Product with id: {id} not found", 404);

            var productDto = mapper.Map<ProductDto>(productWithReviews);
            return Result<ProductDto>.Success(productDto);
        });
    }
}
