using System;
using Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities;

public class Reactions
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

    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("reviewId")]
    public string ReviewId { get; set; } = string.Empty;

    [BsonRepresentation(BsonType.String)]
    [BsonElement("reaction")]
    public ReactionType Reaction { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
