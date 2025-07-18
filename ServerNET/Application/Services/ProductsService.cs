using System;
using Application.Core;
using Application.DTOs;
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

    public async Task<Result<ProductDto[]>> GetProductsAsync()
    {
        return await serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productWithReviews = await _productsCollection.Aggregate()
                .Lookup<Product, Review, ProductWithReviews>(
                    _reviewsCollection,
                    product => product.Id,
                    review => review.ProductId,
                    result => result.Reviews
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
                )
                .ToListAsync();

            var productDtos = mapper.Map<ProductDto[]>(productWithReviews);
            return productDtos;
        });
    }
}
