using System;
using Application.DTOs.Reviews;

namespace Application.Tests.Builders.Reviews;

public class UpdateReviewDtoBuilder
{
    private string? _authorId = Guid.NewGuid().ToString();
    private string _comment = "Comment Update";
    private int _rating = 5;

    public UpdateReviewDtoBuilder WithAuthorId(string authorId)
    {
        _authorId = authorId;
        return this;
    }

    public UpdateReviewDtoBuilder WithComment(string comment)
    {
        _comment = comment;
        return this;
    }

    public UpdateReviewDtoBuilder WithRating(int rating)
    {
        _rating = rating;
        return this;
    }

    public UpdateReviewDto Build()
    {
        return new UpdateReviewDto
        {
            AuthorId = _authorId,
            Comment = _comment,
            Rating = _rating
        };
    }
}
