using System;
using Application.DTOs.Reactions;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IReactionsRepository
{
    Task<List<Reactions>> GetByProductIdAndAuthorIdAsync(string productId, string authorId);
    Task<List<ReviewReactionCountDto>> GetReviewsTotalReactionsAsync(List<string> reviewIds);
    Task<Reactions> InsertAsync(CreateReactionDto createReactionDto);
    Task<Reactions> UpdateAsync(string id, UpdateReactionDto updateReactionDto);
}
