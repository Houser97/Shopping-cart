using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities;

public class Review
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("authorId")]
    public string AuthorId { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("productId")]
    public string ProductId { get; set; } = string.Empty;

    [BsonElement("comment")]
    public string Comment { get; set; } = string.Empty;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


}
