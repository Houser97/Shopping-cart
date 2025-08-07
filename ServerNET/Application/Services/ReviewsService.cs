using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Reviews;
using Application.Interfaces;
using Application.Shared;
using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Services;

public class ReviewsService(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings,
    IServiceHelper<ReviewsService> serviceHelper,
    IProductsService productsService,
    IReactionsService reactionsService,
    IMapper mapper
) : IReviewsService
{
    private readonly IMongoCollection<Review> _reviewsCollection =
        dbContext.Database.GetCollection<Review>(settings.Value.ReviewsCollectionName);

    private readonly IMongoCollection<Reactions> _reactionsCollection =
        dbContext.Database.GetCollection<Reactions>(settings.Value.ReactionsCollectionName);

    private readonly IMongoCollection<User> _usersCollection =
        dbContext.Database.GetCollection<User>(settings.Value.UsersCollectionName);

    private readonly IMongoCollection<Ratings> _ratingsCollection =
        dbContext.Database.GetCollection<Ratings>(settings.Value.RatingsCollectionName);

    private readonly IMapper _mapper = mapper;

    private readonly IServiceHelper<ReviewsService> _serviceHelper = serviceHelper;

    public async Task<Result<ReviewDto>> CreateReview(CreateReviewDto createReviewDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var productId = createReviewDto.ProductId;
            var authorId = createReviewDto.AuthorId;

            var reviewExistsFilter = Builders<Review>.Filter.And(
                Builders<Review>.Filter.Eq(review => review.ProductId, productId),
                Builders<Review>.Filter.Eq(review => review.AuthorId, authorId)
            );

            var productExistsTask = productsService.GetProductById(productId);
            var reviewExistsTask = _reviewsCollection.Find(reviewExistsFilter).FirstOrDefaultAsync();

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

            await _reviewsCollection.InsertOneAsync(review);

            var reviewDto = _mapper.Map<ReviewDto>(review);
            return Result<ReviewDto>.Success(reviewDto);
        });
    }

    public async Task<Result<ReviewDto>> DeleteReview(string id, string authorId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var filter = Builders<Review>.Filter.And(
                Builders<Review>.Filter.Eq(r => r.Id, id),
                Builders<Review>.Filter.Eq(r => r.AuthorId, authorId)
            );

            var review = await _reviewsCollection.FindOneAndDeleteAsync(filter);

            if (review == null)
                return Result<ReviewDto>.Failure("User does not match review author id, or review not found", 404);

            var reviewDto = _mapper.Map<ReviewDto>(review);
            return Result<ReviewDto>.Success(reviewDto);
        });
    }

    public async Task<Result<ReviewDto>> GetReviewById(string id)
    {
        var filter = Builders<Review>.Filter.Eq(review => review.Id, id);
        var review = await _reviewsCollection.Find(filter).FirstOrDefaultAsync();

        if (review == null)
            return Result<ReviewDto>.Failure($"Review with id: {id} not found", 404);

        var reviewDto = _mapper.Map<ReviewDto>(review);
        return Result<ReviewDto>.Success(reviewDto);
    }

    public async Task<Result<ReviewDto>> GetReviewByProductIdAndUserId(string productId, string userId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var filter = Builders<Review>.Filter.And(
                Builders<Review>.Filter.Eq(review => review.ProductId, productId),
                Builders<Review>.Filter.Eq(review => review.AuthorId, userId)
            );

            var review = await _reviewsCollection.Find(filter).FirstOrDefaultAsync();

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

            var filter = Builders<Review>.Filter.Eq(review => review.ProductId, productId);
            var totalReviewsTask = _reviewsCollection.CountDocumentsAsync(filter);

            var reviewsAggregate = _reviewsCollection.Aggregate()
                .Match(review => review.ProductId == productId)
                .SortByDescending(review => review.CreatedAt)
                .Skip((page - 1) * limit)
                .Limit(limit)
                .Lookup<Review, Reactions, ReviewWithDetails>(
                    _reactionsCollection,
                    review => review.Id,
                    reaction => reaction.ReviewId,
                    result => result.Reactions
                )
                .Lookup<ReviewWithDetails, Ratings, ReviewWithDetails>(
                    _ratingsCollection,
                    review => review.Id,
                    rating => rating.ReviewId,
                    review => review.Ratings
                )
                .Lookup<ReviewWithDetails, User, ReviewWithDetails>(
                    _usersCollection,
                    review => review.AuthorId,
                    user => user.Id,
                    result => result.Author
                ).Unwind<ReviewWithDetails, ReviewWithDetails>(
                    review => review.Author,
                    new AggregateUnwindOptions<ReviewWithDetails> { PreserveNullAndEmptyArrays = true }
                )
                .Project<ReviewWithDetails>(new BsonDocument
                {
                    { "author.password", 0 },
                    { "author.email", 0 },
                    { "author.cart", 0 },
                    { "__v", 0 },
                    { "author.__v", 0 },
                });

            var reviewsTask = reviewsAggregate.ToListAsync();

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
            var Comment = updateReviewDto.Comment;
            var Rating = updateReviewDto.Rating;

            var filter = Builders<Review>.Filter.Eq(review => review.Id, id);
            var update = Builders<Review>.Update
                .Set(review => review.Comment, Comment)
                .Set(review => review.Rating, Rating)
                .Set(review => review.UpdatedAt, DateTime.UtcNow);

            var options = new FindOneAndUpdateOptions<Review>
            {
                ReturnDocument = ReturnDocument.After
            };

            var updatedReview = await _reviewsCollection.FindOneAndUpdateAsync(filter, update, options);

            if (updatedReview is null)
                return Result<ReviewDto>.Failure($"Review with id: {id} not found", 404);

            var reviewDto = _mapper.Map<ReviewDto>(updatedReview);
            return Result<ReviewDto>.Success(reviewDto);
        });
    }
}
