using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Products;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Services;

public class ProductsService(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings,
    IMapper mapper,
    IServiceHelper<ProductsService> serviceHelper
) : IProductsService
{
    private readonly IMongoCollection<Product> _productsCollection =
        dbContext.Database.GetCollection<Product>(settings.Value.ProductsCollectionName);

    private readonly IMongoCollection<Review> _reviewsCollection =
        dbContext.Database.GetCollection<Review>(settings.Value.ReviewsCollectionName);

    private readonly IServiceHelper<ProductsService> _serviceHelper = serviceHelper;

    private IAggregateFluent<ProductWithReviews> BuildBaseProductAggregation(IMongoCollection<Product> collection)
    {
        return collection.Aggregate()
            .Lookup<Product, Review, ProductWithReviews>(
                _reviewsCollection,
                p => p.Id,
                r => r.ProductId,
                r => r.Reviews
            )
            .AppendStage<ProductWithReviews>(
                new BsonDocument("$addFields", new BsonDocument
                {
                    { "rating", new BsonDocument("$avg", "$reviews.rating") },
                    {
                        "totalReviews", new BsonDocument(
                            "$size", new BsonDocument(
                                "$ifNull", new BsonArray { "$reviews", new BsonArray() }
                            )
                        )
                    }
                })
            );
    }

    public async Task<Result<ProductDto[]>> GetProductsAsync()
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await BuildBaseProductAggregation(_productsCollection)
                .ToListAsync();

            var productDtos = mapper.Map<ProductDto[]>(productWithReviews);
            return Result<ProductDto[]>.Success(productDtos);
        });
    }

    public async Task<Result<ProductDto>> GetProductById(string id)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await BuildBaseProductAggregation(_productsCollection)
                .Match(p => p.Id == id)
                .FirstOrDefaultAsync();

            var productDto = mapper.Map<ProductDto>(productWithReviews);
            return Result<ProductDto>.Success(productDto);
        });
    }
}
