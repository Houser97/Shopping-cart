using System;
using Application.DTOs.Reactions;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Repositories;

public class ReactionsRepository(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings
) : IReactionsRepository
{

    private readonly IMongoCollection<Reactions> _reactionsCollection =
        dbContext.Database.GetCollection<Reactions>(settings.Value.ReactionsCollectionName);

    public async Task<List<Reactions>> GetByProductIdAndAuthorIdAsync(string productId, string authorId)
    {
        return await _reactionsCollection.Find(
                reaction => reaction.ProductId == productId && reaction.AuthorId == authorId
            ).ToListAsync();
    }

    public async Task<List<ReviewReactionCountDto>> GetReviewsTotalReactionsAsync(List<string> reviewIds)
    {
        var objectIds = reviewIds.Select(id => new ObjectId(id)).ToList();

        var pipeline = new[]
        {
            new BsonDocument("$match", new BsonDocument("reviewId", new BsonDocument("$in", new BsonArray(objectIds)))),
            new BsonDocument("$group", new BsonDocument
            {
                { "_id", new BsonDocument
                    {
                        { "reaction", "$reaction" },
                        { "reviewId", "$reviewId" }
                    }
                },
                { "total", new BsonDocument("$sum", 1) }
            }),
            new BsonDocument("$project", new BsonDocument
            {
                { "_id", 0 },
                { "reviewId", new BsonDocument("$toString", "$_id.reviewId") },
                { "reaction", "$_id.reaction" },
                { "total", 1 }
            })
            };

        return await _reactionsCollection.Aggregate<ReviewReactionCountDto>(pipeline).ToListAsync();
    }

    public async Task<Reactions> InsertAsync(CreateReactionDto createReactionDto)
    {
        var reaction = new Reactions
        {
            ProductId = createReactionDto.ProductId,
            AuthorId = createReactionDto.AuthorId!,
            Reaction = createReactionDto.Reaction,
            ReviewId = createReactionDto.ReviewId
        };

        await _reactionsCollection.InsertOneAsync(reaction);

        return reaction;
    }

    public async Task<Reactions?> UpdateAsync(string id, UpdateReactionDto updateReactionDto)
    {
        var filter = Builders<Reactions>.Filter.Eq(r => r.Id, id);
        var update = Builders<Reactions>.Update.Set(r => r.Reaction, updateReactionDto.Reaction);

        var options = new FindOneAndUpdateOptions<Reactions>
        {
            ReturnDocument = ReturnDocument.After
        };

        return await _reactionsCollection.FindOneAndUpdateAsync(
            r => r.Id == id && r.AuthorId == updateReactionDto.AuthorId,
            update,
            options
        );
    }
}
