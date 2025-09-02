using System;
using Domain.Entities;

namespace Application.Tests.Builders.Reviews;

public class ReviewBuilder
{

    private string _id = Guid.NewGuid().ToString();
    private string _authorId = Guid.NewGuid().ToString();
    private string _productId = Guid.NewGuid().ToString();
    private string _comment = "Generic comment";
    private int _rating = 5;
    private DateTime _createdAt = DateTime.UtcNow;
    private DateTime _updatedAt = DateTime.UtcNow;

    public ReviewBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public ReviewBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public ReviewBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public ReviewBuilder WithComment(string comment)
    {
        _comment = comment;
        return this;
    }

    public ReviewBuilder WithRating(int rating)
    {
        _rating = rating;
        return this;
    }

    public Review Build()
    {
        return new Review
        {
            Id = _id,
            AuthorId = _authorId,
            ProductId = _productId,
            Comment = _comment,
            Rating = _rating,
            CreatedAt = _createdAt,
            UpdatedAt = _updatedAt
        };
    }
}
