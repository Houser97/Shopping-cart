using System;
using Application.DTOs.Reactions;
using Domain.Enums;

namespace Application.Tests.Builders.Reactions;

public class UpdateReactionDtoBuilder
{
    private string _reviewId = Guid.NewGuid().ToString();
    private string _authorId = Guid.NewGuid().ToString();
    private ReactionType _reaction = ReactionType.like;

    public UpdateReactionDtoBuilder WithReviewId(string reviewId)
    {
        _reviewId = reviewId;
        return this;
    }

    public UpdateReactionDtoBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public UpdateReactionDtoBuilder WithReaction(ReactionType reaction)
    {
        _reaction = reaction;
        return this;
    }

    public UpdateReactionDto Build()
    {
        return new UpdateReactionDto
        {
            ReviewId = _reviewId,
            AuthorId = _authorId,
            Reaction = _reaction
        };
    }

}
