using System;
using MongoDB.Driver;

namespace Persistence.Interfaces;

public interface IAppDbContext
{
    IMongoDatabase Database { get; }
}
