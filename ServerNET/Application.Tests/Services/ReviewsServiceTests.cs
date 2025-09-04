using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Products;
using Application.DTOs.Reviews;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Application.Shared;
using Application.Tests.Builders.Products;
using Application.Tests.Builders.Reactions;
using Application.Tests.Builders.Reviews;
using Application.Tests.Builders.User;
using Application.Tests.Extensions;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using FluentAssertions;
using Moq;

namespace Application.Tests.Services;

public class ReviewsServiceTests
{

    private readonly Mock<IReactionsService> _reactionsServiceMock;
    private readonly Mock<IProductsService> _productsServiceMock;
    private readonly Mock<IReviewsRepository> _reviewsRepositoryMock;
    private readonly Mock<IUserAccessor> _userAccessorMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IServiceHelper<ReviewsService>> _serviceHelperMock;
    private readonly ReviewsService _reviewsService;
    private readonly string UserId = "user-id";

    public ReviewsServiceTests()
    {
        _reviewsRepositoryMock = new Mock<IReviewsRepository>();
        _productsServiceMock = new Mock<IProductsService>();
        _reactionsServiceMock = new Mock<IReactionsService>();
        _userAccessorMock = new Mock<IUserAccessor>();
        _mapperMock = new Mock<IMapper>();
        _serviceHelperMock = new Mock<IServiceHelper<ReviewsService>>();

        _serviceHelperMock.SetupExecuteSafe<ReviewsService, ReviewDto>();
        _serviceHelperMock.SetupExecuteSafe<ReviewsService, PagedResult<ReviewPageDataDto>>();

        _userAccessorMock
            .Setup(x => x.GetUserId())
            .Returns(UserId);

        _reviewsService = new ReviewsService(
            _reviewsRepositoryMock.Object,
            _serviceHelperMock.Object,
            _productsServiceMock.Object,
            _reactionsServiceMock.Object,
            _mapperMock.Object,
            _userAccessorMock.Object
        );

    }

    [Fact]
    public async Task GetReviewByProductIdAndUserId_ShouldReturnSuccess_WhenValidProductId()
    {
        // Arrange
        string productId = Guid.NewGuid().ToString();

        // Arrange - Review
        var review = new ReviewBuilder()
            .WithAuthorId(UserId)
            .WithProductId(productId)
            .Build();

        // Arrange - ReviewDto
        var reviewDto = new ReviewDtoBuilder()
            .WithProductId(review.ProductId)
            .WithId(review.Id)
            .WithRating(review.Rating)
            .WithComment(review.Comment)
            .WithReactions([
                new ReactionDtoBuilder().Build(),
                new ReactionDtoBuilder().Build(),
                new ReactionDtoBuilder().Build(),
            ])
            .WithAuthor(
                new ReviewUserDtoBuilder()
                .WithId(UserId)
                .Build()
            )
            .Build();

        _reviewsRepositoryMock
            .Setup(x => x.GetByProductIdAndUserIdAsync(
                It.Is<string>(p => p == productId),
                It.Is<string>(u => u == UserId)
            ))
            .ReturnsAsync(review);

        _mapperMock
            .Setup(x => x.Map<ReviewDto>(review))
            .Returns(reviewDto);

        //Act
        var result = await _reviewsService.GetReviewByProductIdAndUserId(productId);

        //Assert
        _userAccessorMock
            .Verify(x => x.GetUserId(), Times.Once());

        _reviewsRepositoryMock
            .Verify(x => x.GetByProductIdAndUserIdAsync(
                It.Is<string>(p => p == productId),
                It.Is<string>(u => u == UserId)
            ), Times.Once());

        _mapperMock
            .Verify(x => x.Map<ReviewDto>(review), Times.Once());

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(reviewDto, options => options.WithoutStrictOrdering());
    }

    [Fact]
    public async Task GetReviewByProductIdAndUserId_ShouldReturnFailure_WhenProductNotFound()
    {
        // Arrange
        string productId = "product-not-found-id";

        _reviewsRepositoryMock
            .Setup(x => x.GetByProductIdAndUserIdAsync(
                It.Is<string>(p => p == productId),
                It.Is<string>(u => u == UserId)
            ))
            .ReturnsAsync((Review?)null);

        //Act
        var result = await _reviewsService.GetReviewByProductIdAndUserId(productId);

        //Assert
        _reviewsRepositoryMock
            .Verify(x => x.GetByProductIdAndUserIdAsync(
                It.Is<string>(p => p == productId),
                It.Is<string>(u => u == UserId)
            ), Times.Once());

        _mapperMock.Verify(x => x.Map<ReviewDto>(It.IsAny<Review>()), Times.Never());

        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be($"No review found for productId '{productId}' and userId '{UserId}'");
        result.Code.Should().Be(404);
    }

    [Fact]
    public async Task GetReviewsAsync_ShouldReturnSuccess_WhenParamsAreValid()
    {
        //Arrange - Params
        string productId = "product-id";
        var paginationDto = new PaginationDto();

        // Arrange - List<ReviewWithDetails>
        var reviewsWithDetails = new List<ReviewWithDetails> {
            new ReviewWithDetailsBuilder()
                .WithAuthor(new UserBuilder().Build())
                .WithReactions([
                    new ReactionBuilder().Build(),
                    new ReactionBuilder().Build(),
                    new ReactionBuilder().WithReaction(Domain.Enums.ReactionType.like).Build(),
                ])
                .Build(),
            new ReviewWithDetailsBuilder()
                .WithAuthor(new UserBuilder().Build())
                .WithReactions([
                    new ReactionBuilder().Build(),
                    new ReactionBuilder().Build(),
                    new ReactionBuilder().WithReaction(ReactionType.dislike).Build(),
                ])
                .Build(),
        };

        // Arrange - ReactionCountDictionary
        var reactionCountDictionary = new ReactionCountDictionaryBuilder()
            .ForReview(reviewsWithDetails[0].Id)
                .WithReaction(ReactionType.love, 2)
                .WithReaction(ReactionType.like, 1)
            .ForReview(reviewsWithDetails[1].Id)
                .WithReaction(ReactionType.love, 2)
                .WithReaction(ReactionType.dislike, 1)
            .Build();

        _reviewsRepositoryMock
            .Setup(x => x.CountByProductIdAsync(It.Is<string>(s => s == productId)))
            .ReturnsAsync(3);

        _reviewsRepositoryMock
            .Setup(x => x.GetPagedReviewsWithDetails(
                It.Is<string>(s => s == productId),
                It.Is<int>(p => p == paginationDto.Page),
                It.Is<int>(l => l == paginationDto.Limit)
            ))
            .ReturnsAsync(reviewsWithDetails);

        var reviewIds = new List<string>
        {
            reviewsWithDetails[0].Id,
            reviewsWithDetails[1].Id
        };

        _reactionsServiceMock
            .Setup(x => x.GetReviewsTotalReactions(
                It.Is<List<string>>(s => s.SequenceEqual(reviewIds))
            ))
            .ReturnsAsync(Result<Dictionary<string, Dictionary<ReactionType, int>>>.Success(reactionCountDictionary));

        var mappedReviews = reviewsWithDetails.Select(r => new ReviewDtoBuilder()
            .WithId(r.Id)
            .WithProductId(r.ProductId)
            .WithAuthor(new ReviewUserDtoBuilder().WithId(r.Author.Id).Build())
            .Build()
        ).ToList();

        _mapperMock
            .Setup(x => x.Map<List<ReviewDto>>(It.Is<List<ReviewWithDetails>>(s => s.SequenceEqual(reviewsWithDetails))))
            .Returns(mappedReviews);

        //Arrange - Expected result

        var expectedResult = new PagedResult<ReviewPageDataDto>
        {
            Data = new ReviewPageDataDto
            {
                Reviews = mappedReviews,
                TotalReactions = reactionCountDictionary
            },
            Total = 3,
            Page = paginationDto.Page,
            Limit = paginationDto.Limit,
            TotalPages = (int)Math.Ceiling(3.0 / paginationDto.Limit),
            Next = (paginationDto.Page * paginationDto.Limit < 3) ?
        $"/api/reviews/{productId}?page={paginationDto.Page + 1}&limit={paginationDto.Limit}" : null,
            Prev = (paginationDto.Page > 1) ?
        $"/api/reviews/{productId}?page={paginationDto.Page - 1}&limit={paginationDto.Limit}" : null
        };

        //Act
        var result = await _reviewsService.GetReviewsAsync(productId, paginationDto);

        //Assert
        _reviewsRepositoryMock.Verify(x => x.CountByProductIdAsync(productId), Times.Once);
        _reviewsRepositoryMock.Verify(x => x.GetPagedReviewsWithDetails(productId, paginationDto.Page, paginationDto.Limit), Times.Once);
        _reactionsServiceMock.Verify(x => x.GetReviewsTotalReactions(It.Is<List<string>>(ids => ids.SequenceEqual(reviewIds))), Times.Once);
        _mapperMock.Verify(x => x.Map<List<ReviewDto>>(reviewsWithDetails), Times.Once);
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(expectedResult, options => options.WithoutStrictOrdering());

    }

    [Fact]
    public async Task GetReviewsAsync_ShouldReturnEmptyList_WhenNoReviewsExist()
    {
        // Arrange
        string productId = "product-id";
        var paginationDto = new PaginationDto { Page = 1, Limit = 10 };

        _reviewsRepositoryMock
            .Setup(x => x.CountByProductIdAsync(productId))
            .ReturnsAsync(0);

        _reviewsRepositoryMock
            .Setup(x => x.GetPagedReviewsWithDetails(productId, 1, 10))
            .ReturnsAsync(new List<ReviewWithDetails>());

        _reactionsServiceMock
            .Setup(x => x.GetReviewsTotalReactions(It.IsAny<List<string>>()))
            .ReturnsAsync(Result<Dictionary<string, Dictionary<ReactionType, int>>>.Success(new()));

        _mapperMock
            .Setup(x => x.Map<List<ReviewDto>>(It.IsAny<List<ReviewWithDetails>>()))
            .Returns([]);

        // Act
        var result = await _reviewsService.GetReviewsAsync(productId, paginationDto);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.Data.Reviews.Should().BeEmpty();
        result.Value.Total.Should().Be(0);
        result.Value.TotalPages.Should().Be(0);
        result.Value.Next.Should().BeNull();
        result.Value.Prev.Should().BeNull();
    }

    [Fact]
    public async Task GetReviewsAsync_ShouldReturnEmpty_WhenPageExceedsTotalPages()
    {
        // Arrange
        string productId = "product-id";
        var paginationDto = new PaginationDto { Page = 5, Limit = 10 };

        _reviewsRepositoryMock
            .Setup(x => x.CountByProductIdAsync(productId))
            .ReturnsAsync(10);

        _reviewsRepositoryMock
            .Setup(x => x.GetPagedReviewsWithDetails(productId, 5, 10))
            .ReturnsAsync([]);

        _reactionsServiceMock
            .Setup(x => x.GetReviewsTotalReactions(It.IsAny<List<string>>()))
            .ReturnsAsync(Result<Dictionary<string, Dictionary<ReactionType, int>>>.Success(new()));

        _mapperMock
            .Setup(x => x.Map<List<ReviewDto>>(It.IsAny<List<ReviewWithDetails>>()))
            .Returns([]);

        // Act
        var result = await _reviewsService.GetReviewsAsync(productId, paginationDto);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.Data.Reviews.Should().BeEmpty();
        result.Value.TotalPages.Should().Be(1);
    }

    [Fact]
    public async Task GetReviewsAsync_ShouldFallbackToEmptyReactions_WhenReactionServiceFails()
    {
        // Arrange
        string productId = "product-id";
        var paginationDto = new PaginationDto { Page = 1, Limit = 10 };

        var review = new ReviewWithDetailsBuilder().Build();

        _reviewsRepositoryMock
            .Setup(x => x.CountByProductIdAsync(productId))
            .ReturnsAsync(1);

        _reviewsRepositoryMock
            .Setup(x => x.GetPagedReviewsWithDetails(productId, 1, 10))
            .ReturnsAsync([review]);

        _reactionsServiceMock
            .Setup(x => x.GetReviewsTotalReactions(It.IsAny<List<string>>()))
            .ReturnsAsync(Result<Dictionary<string, Dictionary<ReactionType, int>>>.Failure("Error", 500));

        _mapperMock
            .Setup(x => x.Map<List<ReviewDto>>(It.IsAny<List<ReviewWithDetails>>()))
            .Returns([new ReviewDtoBuilder().WithId(review.Id).Build()]);

        // Act
        var result = await _reviewsService.GetReviewsAsync(productId, paginationDto);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.Data.TotalReactions.Should().BeEmpty(); // ← fallback
    }

    [Fact]
    public async Task CreateReview_ShouldReturnSuccess_WhenDtoIsValid()
    {
        //Arrange - CreateReviewDto
        var createReviewDto = new CreateReviewDtoBuilder()
            .WithAuthorId(UserId)
            .Build();

        //Arrange - ProductDto
        var product = new ProductDtoBuilder().Build();

        //Arrange - Review
        var review = new ReviewBuilder()
            .WithAuthorId(createReviewDto.AuthorId!)
            .WithProductId(createReviewDto.ProductId)
            .WithComment(createReviewDto.Comment)
            .WithRating(createReviewDto.Rating)
            .Build();

        //Arrange - Excepted Result (ReviewDto)
        var reviewDto = new ReviewDtoBuilder()
            .WithId(review.Id)
            .WithAuthor(
                new ReviewUserDtoBuilder()
                    .WithId(createReviewDto.AuthorId!)
                    .Build()
            )
            .WithProductId(createReviewDto.ProductId)
            .WithComment(createReviewDto.Comment)
            .WithRating(createReviewDto.Rating)
            .Build();

        _productsServiceMock
            .Setup(x => x.GetProductById(It.Is<string>(s => s == createReviewDto.ProductId)))
            .ReturnsAsync(Result<ProductDto>.Success(product));

        _reviewsRepositoryMock
            .Setup(x => x.GetByProductIdAndUserIdAsync(
                It.Is<string>(p => p == createReviewDto.ProductId),
                It.Is<string>(u => u == createReviewDto.AuthorId)
            ))
            .ReturnsAsync((Review?)null);

        _reviewsRepositoryMock
            .Setup(x => x.InsertAsync(It.Is<Review>(r =>
                r.AuthorId == review.AuthorId &&
                r.Comment == review.Comment &&
                r.ProductId == review.ProductId &&
                r.Rating == review.Rating
            )));

        _mapperMock
            .Setup(x => x.Map<ReviewDto>(It.Is<Review>(r =>
                r.AuthorId == review.AuthorId &&
                r.Comment == review.Comment &&
                r.ProductId == review.ProductId &&
                r.Rating == review.Rating
            )))
            .Returns(reviewDto);

        //Act
        var result = await _reviewsService.CreateReview(createReviewDto);

        //Assert
        _productsServiceMock
            .Verify(x => x.GetProductById(It.Is<string>(s => s == createReviewDto.ProductId)), Times.Once);

        _reviewsRepositoryMock
            .Verify(x => x.GetByProductIdAndUserIdAsync(
                It.Is<string>(p => p == createReviewDto.ProductId),
                It.Is<string>(u => u == createReviewDto.AuthorId)
            ), Times.Once);

        _reviewsRepositoryMock
            .Verify(x => x.InsertAsync(It.Is<Review>(r =>
                r.AuthorId == review.AuthorId &&
                r.Comment == review.Comment &&
                r.ProductId == review.ProductId &&
                r.Rating == review.Rating
            )), Times.Once);

        _mapperMock
            .Verify(x => x.Map<ReviewDto>(It.Is<Review>(r =>
                r.AuthorId == review.AuthorId &&
                r.Comment == review.Comment &&
                r.ProductId == review.ProductId &&
                r.Rating == review.Rating
            )), Times.Once);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(reviewDto, options => options.WithoutStrictOrdering());
    }

    [Theory]
    [InlineData(false, null, "Product does not exist", 400)]
    [InlineData(true, "existingReview", "Review already exists", 400)]
    public async Task CreateReview_ShouldReturnFailure_InDifferentScenarios(
        bool productExists, string? reviewExists, string expectedError, int expectedCode)
    {
        var dto = new CreateReviewDtoBuilder().WithAuthorId(UserId).Build();

        if (productExists)
        {
            var product = new ProductDtoBuilder().Build();
            _productsServiceMock
                .Setup(x => x.GetProductById(dto.ProductId))
                .ReturnsAsync(Result<ProductDto>.Success(product));
        }
        else
        {
            _productsServiceMock
                .Setup(x => x.GetProductById(dto.ProductId))
                .ReturnsAsync(Result<ProductDto>.Failure("Not found", 404));
        }

        _reviewsRepositoryMock
            .Setup(x => x.GetByProductIdAndUserIdAsync(dto.ProductId, dto.AuthorId!))
            .ReturnsAsync(reviewExists == null ? null : new Review());

        // Act
        var result = await _reviewsService.CreateReview(dto);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be(expectedError);
        result.Code.Should().Be(expectedCode);
    }


}
