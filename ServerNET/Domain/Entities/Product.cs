using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities;

public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("authorId")]
    public string AuthorId { get; set; } = string.Empty;

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.Decimal128)]
    [BsonElement("price")]
    public decimal Price { get; set; } = 0m;

    [BsonElement("images")]
    public string[] Images { get; set; } = [];

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}
