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
}
