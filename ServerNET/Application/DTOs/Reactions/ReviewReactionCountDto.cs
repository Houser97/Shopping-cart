using System;
using Domain.Enums;
using MongoDB.Bson.Serialization.Attributes;

namespace Application.DTOs.Reactions;

public class ReviewReactionCountDto
{
    [BsonElement("reviewId")]
    public string ReviewId { get; set; } = string.Empty;

    [BsonElement("reaction")]
    public ReactionType Reaction { get; set; }

    [BsonElement("total")]
    public int Total { get; set; }
}
