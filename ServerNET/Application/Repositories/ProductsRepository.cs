using System;
using Application.Aggregates;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Repositories;

public class ProductsRepository(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings
) : IProductsRepository
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
                    { "Rating", new BsonDocument("$avg", "$Reviews.rating") },
                    {
                        "TotalReviews", new BsonDocument(
                            "$size", new BsonDocument(
                                "$ifNull", new BsonArray { "$Reviews", new BsonArray() }
                            )
                        )
                    }
                })
            );
    }

    public async Task<ProductWithReviews> GetProductByIdAsync(string id)
    {
        return await BuildBaseProductAggregation(_productsCollection)
            .Match(p => p.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<List<ProductWithReviews>> GetProductsAsync()
    {
        return await BuildBaseProductAggregation(_productsCollection)
            .ToListAsync();
    }
}
