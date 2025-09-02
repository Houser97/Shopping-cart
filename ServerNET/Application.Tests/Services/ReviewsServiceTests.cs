using System;
using Application.DTOs.Reviews;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Application.Tests.Builders.Reactions;
using Application.Tests.Builders.Reviews;
using Application.Tests.Extensions;
using AutoMapper;
using Domain.Entities;
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
}
