using System;
using Application.DTOs.Reactions;
using Domain.Enums;

namespace Application.Tests.Builders.Reactions;

public class CreateReactionDtoBuilder
{
    private string _productId = Guid.NewGuid().ToString();
    private string _reviewId = Guid.NewGuid().ToString();
    private string _authorId = Guid.NewGuid().ToString();
    private ReactionType _reaction = ReactionType.like;

    public CreateReactionDtoBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public CreateReactionDtoBuilder WithReviewId(string reviewId)
    {
        _reviewId = reviewId;
        return this;
    }

    public CreateReactionDtoBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public CreateReactionDtoBuilder WithReaction(ReactionType reaction)
    {
        _reaction = reaction;
        return this;
    }

    public CreateReactionDto Build()
    {
        return new CreateReactionDto
        {
            ProductId = _productId,
            ReviewId = _reviewId,
            AuthorId = _authorId,
            Reaction = _reaction
        };
    }
}
