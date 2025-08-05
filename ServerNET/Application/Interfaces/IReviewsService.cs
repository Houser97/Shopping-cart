using System;
using Application.Core;
using Application.DTOs.Reviews;
using Application.Shared;
using Domain.Entities;

namespace Application.Interfaces;

public interface IReviewsService
{
    Task<Result<PagedResult<ReviewPageDataDto>>> GetReviewsAsync(string productId, PaginationDto paginationDto);
    Task<Result<ReviewDto>> GetReviewById(string id);
    Task<Result<ReviewDto>> GetReviewByProductIdAndUserId(string productId, string userId);
    Task<Result<ReviewDto>> CreateReview(CreateReviewDto createReviewDto);
    Task<Result<ReviewDto>> UpdateReview(string id, UpdateReviewDto updateReviewDto);
    Task<Result<ReviewDto>> DeleteReview(string id, string authorId);
}
