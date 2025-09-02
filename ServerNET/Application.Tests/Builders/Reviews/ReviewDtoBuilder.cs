using System;
using Application.DTOs.Reactions;
using Application.DTOs.Reviews;
using Application.DTOs.User;

namespace Application.Tests.Builders.Reviews;

public class ReviewDtoBuilder
{
    private string _id = Guid.NewGuid().ToString();
    private string _productId = Guid.NewGuid().ToString();
    private string _comment = "Generic comment";
    private int _rating = 5;
    private DateTime _createdAt = DateTime.Now;
    private List<ReactionDto> _reactions = [];
    private ReviewUserDto _author = new ReviewUserDtoBuilder().Build();

    public ReviewDtoBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public ReviewDtoBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public ReviewDtoBuilder WithComment(string comment)
    {
        _comment = comment;
        return this;
    }

    public ReviewDtoBuilder WithRating(int rating)
    {
        _rating = rating;
        return this;
    }

    public ReviewDtoBuilder WithCreatedAt(DateTime createdAt)
    {
        _createdAt = createdAt;
        return this;
    }

    public ReviewDtoBuilder WithReactions(List<ReactionDto> reactions)
    {
        _reactions = reactions;
        return this;
    }

    public ReviewDtoBuilder WithAuthor(ReviewUserDto author)
    {
        _author = author;
        return this;
    }

    public ReviewDto Build()
    {
        return new ReviewDto
        {
            Id = _id,
            ProductId = _productId,
            Comment = _comment,
            Rating = _rating,
            Author = _author,
            Reactions = _reactions,
            CreatedAt = _createdAt
        };
    }
}
