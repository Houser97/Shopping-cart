using System;
using Domain.Enums;

namespace Application.Tests.Builders.Reactions;

public class ReactionCountDictionaryBuilder
{
    private readonly Dictionary<string, Dictionary<ReactionType, int>> _data
        = [];

    private string? _currentReviewId;

    public ReactionCountDictionaryBuilder ForReview(string reviewId)
    {
        if (!_data.ContainsKey(reviewId))
            _data[reviewId] = [];

        _currentReviewId = reviewId;
        return this;
    }

    public ReactionCountDictionaryBuilder WithReaction(ReactionType reaction, int count)
    {
        if (_currentReviewId == null)
            throw new InvalidOperationException("Call ForReview before adding reactions.");

        _data[_currentReviewId][reaction] = count;
        return this;
    }

    public Dictionary<string, Dictionary<ReactionType, int>> Build()
    {
        return _data;
    }
}
