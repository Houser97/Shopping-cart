using System;
using Application.Aggregates;
using Application.DTOs.Reviews;
using Domain.Entities;

namespace Application.Interfaces.Repositories;

public interface IReviewsRepository
{
    Task<Review> GetByIdAsync(string id);
    Task<Review?> GetByProductIdAndUserIdAsync(string productId, string userId);
    Task<List<ReviewWithDetails>> GetPagedReviewsWithDetails(string productId, int page, int limit);
    Task<long> CountByProductIdAsync(string productId);
    Task InsertAsync(Review review);
    Task<Review?> UpdateAsync(string id, UpdateReviewDto updateReviewDto);
    Task<Review?> DeleteAsync(string id, string userId);

}
