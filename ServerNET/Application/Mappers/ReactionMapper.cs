using System;
using Application.DTOs.Reactions;
using Domain.Enums;

namespace Application.Mappers;

public static class ReactionMapper
{
    public static Dictionary<string, Dictionary<ReactionType, int>> MapToReviewReactionCount(IEnumerable<ReviewReactionCountDto> reactions)
    {
        var result = new Dictionary<string, Dictionary<ReactionType, int>>();

        foreach (var item in reactions)
        {
            if (!result.TryGetValue(item.ReviewId, out var reactionDict))
            {
                reactionDict = [];
                result[item.ReviewId] = reactionDict;
            }

            reactionDict[item.Reaction] = item.Total;
        }

        return result;
    }
}
