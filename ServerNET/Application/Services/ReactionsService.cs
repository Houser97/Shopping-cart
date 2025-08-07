using System;
using Application.Core;
using Application.DTOs.Reactions;
using Application.Interfaces;
using Application.Mappers;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Services;

public class ReactionsService(
    IServiceHelper<ReactionsService> serviceHelper,
    IMapper mapper,
    IOptions<AppDbSettings> settings,
    IAppDbContext dbContext
) : IReactionsService
{

    private readonly IMongoCollection<Reactions> _reactionsCollection =
        dbContext.Database.GetCollection<Reactions>(settings.Value.ReactionsCollectionName);

    private readonly IServiceHelper<ReactionsService> _serviceHelper = serviceHelper;

    private readonly IMapper _mapper = mapper;

    public Task<Result<ReactionDto>> CreateReaction(CreateReactionDto createReactionDto)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<List<ReactionDto>>> GetReactionsByProductIdAndAuthorId(string productId, string authorId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var reactions = await _reactionsCollection.Find(
                reaction => reaction.ProductId == productId && reaction.AuthorId == authorId
            ).ToListAsync();

            var reactionsDtos = _mapper.Map<List<ReactionDto>>(reactions);
            return Result<List<ReactionDto>>.Success(reactionsDtos);
        });
    }

    public async Task<Result<Dictionary<string, Dictionary<ReactionType, int>>>> GetReviewsTotalReactions(List<string> reviewIds)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
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

            var results = await _reactionsCollection.Aggregate<ReviewReactionCountDto>(pipeline).ToListAsync();

            var mapped = ReactionMapper.MapToReviewReactionCount(results);

            return Result<Dictionary<string, Dictionary<ReactionType, int>>>.Success(mapped);
        });
    }

    public Task<Result<ReactionDto>> UpdateReaction(UpdateReactionDto updateReactionDto)
    {
        throw new NotImplementedException();
    }

}
