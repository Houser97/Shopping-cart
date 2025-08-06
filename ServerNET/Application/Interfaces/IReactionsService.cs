using System;
using Application.Core;
using Application.DTOs.Reactions;
using Domain.Enums;

namespace Application.Interfaces;

public interface IReactionsService
{
    Task<Result<List<ReactionDto>>> GetReactionsByProductIdAndAuthorId(string productId, string authorId);
    Task<Result<Dictionary<string, Dictionary<ReactionType, int>>>> GetReviewsTotalReactions(List<string> reviewIds);
    Task<Result<ReactionDto>> CreateReaction(CreateReactionDto createReactionDto);
    Task<Result<ReactionDto>> UpdateReaction(UpdateReactionDto updateReactionDto);
}
