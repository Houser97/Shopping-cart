using System;
using Application.Core;
using Application.DTOs.Products;

namespace Application.Interfaces.Services;

public interface IProductsService
{
    Task<Result<ProductDto[]>> GetProductsAsync();
    Task<Result<ProductDto>> GetProductById(string id);
}
