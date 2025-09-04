using System;
using Application.DTOs.Reviews;

namespace Application.Tests.Builders.Reviews;

public class CreateReviewDtoBuilder
{
    private string _productId = Guid.NewGuid().ToString();
    private string _authorId = Guid.NewGuid().ToString();
    private string _comment = "Generic comment";
    private int _rating = 5;

    public CreateReviewDtoBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public CreateReviewDtoBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public CreateReviewDtoBuilder WithComment(string comment)
    {
        _comment = comment;
        return this;
    }

    public CreateReviewDtoBuilder WithRating(int rating)
    {
        _rating = rating;
        return this;
    }

    public CreateReviewDto Build()
    {
        return new CreateReviewDto
        {
            ProductId = _productId,
            AuthorId = _authorId,
            Comment = _comment,
            Rating = _rating
        };
    }
}