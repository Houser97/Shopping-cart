using System;
using Application.Aggregates;

namespace Application.Interfaces.Repositories;

public interface IProductsRepository
{
    Task<List<ProductWithReviews>> GetProductsAsync();
    Task<ProductWithReviews?> GetProductByIdAsync(string id);
}
