using System;
using Domain.Enums;

namespace Application.Tests.Builders.Reactions;

public class ReactionBuilder
{
    private string _id { get; set; } = Guid.NewGuid().ToString();
    private string _authorId { get; set; } = Guid.NewGuid().ToString();
    private string _productId { get; set; } = Guid.NewGuid().ToString();
    private string _reviewId { get; set; } = Guid.NewGuid().ToString();
    private ReactionType _reaction { get; set; } = ReactionType.love;
    private DateTime _createdAt { get; set; } = DateTime.UtcNow;

    public ReactionBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public ReactionBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public ReactionBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public ReactionBuilder WithReviewId(string reviewId)
    {
        _reviewId = reviewId;
        return this;
    }

    public ReactionBuilder WithReaction(ReactionType reaction)
    {
        _reaction = reaction;
        return this;
    }

    public ReactionBuilder WithCreatedAt(DateTime createdAt)
    {
        _createdAt = createdAt;
        return this;
    }

    public Domain.Entities.Reactions Build()
    {
        return new Domain.Entities.Reactions
        {
            Id = _id,
            AuthorId = _authorId,
            ProductId = _productId,
            ReviewId = _reviewId,
            Reaction = _reaction,
            CreatedAt = _createdAt
        };
    }
}
