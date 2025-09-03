using System;
using Application.Aggregates;

namespace Application.Tests.Builders.Reviews;

public class ReviewWithDetailsBuilder
{
    private readonly ReviewBuilder _reviewBuilder = new();
    private List<Domain.Entities.Reactions> _reactions = [];
    private Domain.Entities.User _author = new() { Id = Guid.NewGuid().ToString(), Username = "Default User" };

    public ReviewWithDetailsBuilder WithId(string id)
    {
        _reviewBuilder.WithId(id);
        return this;
    }

    public ReviewWithDetailsBuilder WithAuthorId(string authorId)
    {
        _reviewBuilder.WithAuthorId(authorId);
        return this;
    }

    public ReviewWithDetailsBuilder WithProductId(string productId)
    {
        _reviewBuilder.WithProductId(productId);
        return this;
    }

    public ReviewWithDetailsBuilder WithComment(string comment)
    {
        _reviewBuilder.WithComment(comment);
        return this;
    }

    public ReviewWithDetailsBuilder WithRating(int rating)
    {
        _reviewBuilder.WithRating(rating);
        return this;
    }

    public ReviewWithDetailsBuilder WithReactions(List<Domain.Entities.Reactions> reactions)
    {
        _reactions = reactions;
        return this;
    }

    public ReviewWithDetailsBuilder WithAuthor(Domain.Entities.User author)
    {
        _author = author;
        return this;
    }

    public ReviewWithDetails Build()
    {
        var review = _reviewBuilder.Build();

        return new ReviewWithDetails
        {
            Id = review.Id,
            AuthorId = review.AuthorId,
            ProductId = review.ProductId,
            Comment = review.Comment,
            Rating = review.Rating,
            CreatedAt = review.CreatedAt,
            UpdatedAt = review.UpdatedAt,
            Reactions = _reactions,
            Author = _author
        };
    }
}
