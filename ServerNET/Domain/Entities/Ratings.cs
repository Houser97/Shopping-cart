using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities;

public class Ratings
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string Id { get; set; } = string.Empty;

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("authorId")]
    public string AuthorId { get; set; } = string.Empty;

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("reviewId")]
    public string ReviewId { get; set; } = string.Empty;

    [BsonElement("rating")]
    public int Rating { get; set; } = 0;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
