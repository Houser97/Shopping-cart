using System;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Persistence;

public class AppDbContext
{
    private readonly IMongoDatabase _database;

    public AppDbContext(IOptions<AppDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoDatabase Database => _database;
}
