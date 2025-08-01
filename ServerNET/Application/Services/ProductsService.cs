using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Products;
using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;

namespace Application.Services;

public class ProductsService(
    AppDbContext dbContext,
    IOptions<AppDbSettings> settings,
    IMapper mapper,
    ServiceHelper<ProductsService> serviceHelper)
{
    private readonly IMongoCollection<Product> _productsCollection =
        dbContext.Database.GetCollection<Product>(settings.Value.ProductsCollectionName);

    private readonly IMongoCollection<Review> _reviewsCollection =
        dbContext.Database.GetCollection<Review>(settings.Value.ReviewsCollectionName);

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
        return await serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await BuildBaseProductAggregation(_productsCollection)
                .ToListAsync();

            var productDtos = mapper.Map<ProductDto[]>(productWithReviews);
            return Result<ProductDto[]>.Success(productDtos);
        });
    }

    public async Task<Result<ProductDto>> GetProductById(string id)
    {
        return await serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await BuildBaseProductAggregation(_productsCollection)
                .Match(p => p.Id == id)
                .FirstOrDefaultAsync();

            var productDto = mapper.Map<ProductDto>(productWithReviews);
            return Result<ProductDto>.Success(productDto);
        });
    }
}
