using System;
using Application.Core;
using Application.DTOs.Reviews;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Shared;
using AutoMapper;
using Domain.Entities;
using MongoDB.Driver;

namespace Application.Services;

public class ReviewsService(
    IReviewsRepository reviewsRepository,
    IServiceHelper<ReviewsService> serviceHelper,
    IProductsService productsService,
    IReactionsService reactionsService,
    IMapper mapper,
    IUserAccessor userAccessor
) : IReviewsService
{
    private readonly IReviewsRepository _reviewsRepository = reviewsRepository;

    private readonly IMapper _mapper = mapper;

    private readonly IServiceHelper<ReviewsService> _serviceHelper = serviceHelper;
    private readonly IUserAccessor _userAccessor = userAccessor;

    public async Task<Result<ReviewDto>> CreateReview(CreateReviewDto createReviewDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {

            var productId = createReviewDto.ProductId;
            var authorId = _userAccessor.GetUserId()!;

            var productExistsTask = productsService.GetProductById(productId);
            var reviewExistsTask = _reviewsRepository.GetByProductIdAndUserIdAsync(productId, authorId);

            await Task.WhenAll(productExistsTask, reviewExistsTask);

            var productExists = await productExistsTask;
            var reviewExists = await reviewExistsTask;

            if (productExists.Value == null || !productExists.IsSuccess)
                return Result<ReviewDto>.Failure("Product does not exist", 400);

            if (reviewExists is not null)
                return Result<ReviewDto>.Failure("Review already exists", 400);

            var review = new Review
            {
                ProductId = productId,
                AuthorId = authorId,
                Comment = createReviewDto.Comment,
                Rating = createReviewDto.Rating,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _reviewsRepository.InsertAsync(review);

            var reviewDto = _mapper.Map<ReviewDto>(review);
            return Result<ReviewDto>.Success(reviewDto);



        });
    }

    public async Task<Result<ReviewDto>> DeleteReview(string id)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var authorId = _userAccessor.GetUserId()!;

            var review = await _reviewsRepository.DeleteAsync(id, authorId);

            if (review == null)
                return Result<ReviewDto>.Failure("Review not found", 404);

            var reviewDto = _mapper.Map<ReviewDto>(review);
            return Result<ReviewDto>.Success(reviewDto);
        });
    }

    public async Task<Result<ReviewDto>> GetReviewById(string id)
    {
        var review = await _reviewsRepository.GetByIdAsync(id);

        if (review == null)
            return Result<ReviewDto>.Failure($"Review with id: {id} not found", 404);

        var reviewDto = _mapper.Map<ReviewDto>(review);
        return Result<ReviewDto>.Success(reviewDto);
    }

    public async Task<Result<ReviewDto>> GetReviewByProductIdAndUserId(string productId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var userId = _userAccessor.GetUserId();
            var review = await _reviewsRepository.GetByProductIdAndUserIdAsync(productId, userId!);

            if (review == null)
                return Result<ReviewDto>.Failure($"No review found for productId '{productId}' and userId '{userId}'", 404);

            var reviewDto = _mapper.Map<ReviewDto>(review);

            return Result<ReviewDto>.Success(reviewDto);
        });
    }

    public async Task<Result<PagedResult<ReviewPageDataDto>>> GetReviewsAsync(string productId, PaginationDto paginationDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            int page = paginationDto.Page;
            int limit = paginationDto.Limit;

            var totalReviewsTask = _reviewsRepository.CountByProductIdAsync(productId);

            var reviewsTask = _reviewsRepository.GetPagedReviewsWithDetails(productId, page, limit);

            await Task.WhenAll(totalReviewsTask, reviewsTask);

            var reviews = await reviewsTask;
            var totalReviews = await totalReviewsTask;
            var totalPages = (int)Math.Ceiling((double)totalReviews / limit);

            var reviewIds = reviews.Select(review => review.Id).ToList();
            var totalReactionsResult = await reactionsService.GetReviewsTotalReactions(reviewIds);

            var mappedReviews = _mapper.Map<List<ReviewDto>>(reviews);

            var result = new PagedResult<ReviewPageDataDto>
            {
                Data = new ReviewPageDataDto
                {
                    Reviews = mappedReviews,
                    TotalReactions = totalReactionsResult.Value ?? []
                },
                Total = totalReviews,
                Page = page,
                Limit = limit,
                TotalPages = totalPages,
                Next = (page * limit < totalReviews) ? $"/api/reviews/{productId}?page={page + 1}&limit={limit}" : null,
                Prev = (page > 1) ? $"/api/reviews/{productId}?page={page - 1}&limit={limit}" : null
            };


            return Result<PagedResult<ReviewPageDataDto>>.Success(result);
        });
    }

    public async Task<Result<ReviewDto>> UpdateReview(string id, UpdateReviewDto updateReviewDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            updateReviewDto.AuthorId = _userAccessor.GetUserId();
            var updatedReview = await _reviewsRepository.UpdateAsync(id, updateReviewDto);

            if (updatedReview is null)
                return Result<ReviewDto>.Failure($"Review with id: {id} not found", 404);

            var reviewDto = _mapper.Map<ReviewDto>(updatedReview);
            return Result<ReviewDto>.Success(reviewDto);
        });
    }
}
