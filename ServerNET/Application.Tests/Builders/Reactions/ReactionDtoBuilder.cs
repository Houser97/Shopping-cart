using System;
using Application.DTOs.Reactions;
using Domain.Enums;

namespace Application.Tests.Builders.Reactions;

public class ReactionDtoBuilder
{
    private string _id = Guid.NewGuid().ToString();
    private string _authorId = Guid.NewGuid().ToString();
    private string _productId = Guid.NewGuid().ToString();
    private string _reviewId = Guid.NewGuid().ToString();
    private ReactionType _reaction = ReactionType.love;

    public ReactionDtoBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public ReactionDtoBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public ReactionDtoBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public ReactionDtoBuilder WithReviewId(string reviewId)
    {
        _reviewId = reviewId;
        return this;
    }

    public ReactionDtoBuilder WithReaction(ReactionType reaction)
    {
        _reaction = reaction;
        return this;
    }

    public ReactionDto Build()
    {
        return new ReactionDto
        {
            Id = _id,
            AuthorId = _authorId,
            ProductId = _productId,
            ReviewId = _reviewId,
            Reaction = _reaction
        };
    }
}
