using System;
using System.Net;
using System.Reflection;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Clusters;
using MongoDB.Driver.Core.Connections;
using MongoDB.Driver.Core.Servers;

namespace Application.Tests.Helpers;

public static class MongoTestHelpers
{
    public static MongoWriteException CreateDuplicateKeyException()
    {
        var connectionId = new ConnectionId(new ServerId(new ClusterId(1), new DnsEndPoint("localhost", 27017)), 1);

        var writeErrorCtor = typeof(WriteError)
            .GetConstructors(BindingFlags.Instance | BindingFlags.NonPublic)
            .First();

        var writeError = (WriteError)writeErrorCtor.Invoke(
        [
            ServerErrorCategory.DuplicateKey,
            11000,
            "E11000 duplicate key error collection",
            new BsonDocument("details", "duplicate key")
        ]);

        return new MongoWriteException(connectionId, writeError, null, null);
    }
}