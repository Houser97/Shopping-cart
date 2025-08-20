using System;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Persistence.Interfaces;

namespace Persistence.Configurations;

public class DatabaseInitializer(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings
)
{
    private readonly IAppDbContext _dbContext = dbContext;
    private readonly IOptions<AppDbSettings> _settings = settings;

    public async Task InitializeAsync()
    {
        await CreateCartIndexesAsync();
        await CreateReactionIndexesAsync();
    }

    private async Task CreateCartIndexesAsync()
    {
        var cartCollection = _dbContext.Database.GetCollection<Cart>(_settings.Value.CartCollectionName);

        var indexKeys = Builders<Cart>.IndexKeys
            .Ascending(c => c.ProductId)
            .Ascending(c => c.UserId);

        var indexOptions = new CreateIndexOptions
        {
            Unique = true,
            Name = "IDX_Cart_ProductId_UserId_Unique"
        };

        var indexModel = new CreateIndexModel<Cart>(indexKeys, indexOptions);

        await cartCollection.Indexes.CreateOneAsync(indexModel);

    }

    private async Task CreateReactionIndexesAsync()
    {
        var reactionsCollection = _dbContext.Database.GetCollection<Reactions>(_settings.Value.ReactionsCollectionName);

        var indexKeys = Builders<Reactions>.IndexKeys
            .Ascending(r => r.AuthorId)
            .Ascending(r => r.ReviewId);

        var indexOptions = new CreateIndexOptions
        {
            Unique = true,
            Name = "IDX_Reaction_AuthorId_ReviewId_Unique"
        };

        var indexModel = new CreateIndexModel<Reactions>(indexKeys, indexOptions);

        await reactionsCollection.Indexes.CreateOneAsync(indexModel);
    }
}
