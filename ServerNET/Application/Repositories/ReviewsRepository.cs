using System;
using Application.Aggregates;
using Application.DTOs.Reviews;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Repositories;

public class ReviewsRepository(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings
) : IReviewsRepository
{

    private readonly IMongoCollection<Review> _reviewsCollection =
        dbContext.Database.GetCollection<Review>(settings.Value.ReviewsCollectionName);

    private readonly IMongoCollection<Reactions> _reactionsCollection =
        dbContext.Database.GetCollection<Reactions>(settings.Value.ReactionsCollectionName);

    private readonly IMongoCollection<User> _usersCollection =
        dbContext.Database.GetCollection<User>(settings.Value.UsersCollectionName);

    public async Task<long> CountByProductIdAsync(string productId)
    {
        return await _reviewsCollection.CountDocumentsAsync(r => r.ProductId == productId);
    }

    public async Task<Review> DeleteAsync(string id, string userId)
    {
        var filter = Builders<Review>.Filter.And(
            Builders<Review>.Filter.Eq(r => r.Id, id),
            Builders<Review>.Filter.Eq(r => r.AuthorId, userId)
        );

        return await _reviewsCollection.FindOneAndDeleteAsync(filter);
    }

    public async Task<Review> GetByIdAsync(string id)
    {
        var filter = Builders<Review>.Filter.Eq(review => review.Id, id);
        return await _reviewsCollection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<Review?> GetByProductIdAndUserIdAsync(string productId, string userId)
    {
        var filter = Builders<Review>.Filter.And(
            Builders<Review>.Filter.Eq(review => review.ProductId, productId),
            Builders<Review>.Filter.Eq(review => review.AuthorId, userId)
        );

        return await _reviewsCollection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<List<ReviewWithDetails>> GetPagedReviewsWithDetails(string productId, int page, int limit)
    {
        return await _reviewsCollection.Aggregate()
            .Match(review => review.ProductId == productId)
            .SortByDescending(review => review.CreatedAt)
            .Skip((page - 1) * limit)
            .Limit(limit)
            .Lookup<Review, Reactions, ReviewWithDetails>(
                _reactionsCollection,
                review => review.Id,
                reaction => reaction.ReviewId,
                result => result.Reactions
            )
            .Lookup<ReviewWithDetails, User, ReviewWithDetails>(
                _usersCollection,
                review => review.AuthorId,
                user => user.Id,
                result => result.Author
            ).Unwind(
                review => review.Author,
                new AggregateUnwindOptions<ReviewWithDetails> { PreserveNullAndEmptyArrays = true }
            )
            .Project<ReviewWithDetails>(new BsonDocument
            {
                        { "author.password", 0 },
                        { "author.email", 0 },
                        { "author.cart", 0 },
                        { "__v", 0 },
                        { "author.__v", 0 },
            })
            .ToListAsync();
    }

    public async Task InsertAsync(Review review)
    {
        await _reviewsCollection.InsertOneAsync(review);
    }

    public async Task<Review> UpdateAsync(string id, UpdateReviewDto updateReviewDto)
    {
        var Comment = updateReviewDto.Comment;
        var Rating = updateReviewDto.Rating;

        var filter = Builders<Review>.Filter.Eq(review => review.Id, id);
        var update = Builders<Review>.Update
            .Set(review => review.Comment, Comment)
            .Set(review => review.Rating, Rating)
            .Set(review => review.UpdatedAt, DateTime.UtcNow);

        var options = new FindOneAndUpdateOptions<Review>
        {
            ReturnDocument = ReturnDocument.After
        };

        return await _reviewsCollection.FindOneAndUpdateAsync(filter, update, options);
    }

}
