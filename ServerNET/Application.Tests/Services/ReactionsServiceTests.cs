using System;
using Application.DTOs.Reactions;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Application.Tests.Builders.Reactions;
using Application.Tests.Helpers;
using Application.Tests.Extensions;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using FluentAssertions;
using Moq;

namespace Application.Tests.Services;

public class ReactionsServiceTests
{
    private readonly ReactionsService _reactionsService;
    private readonly Mock<IReactionsRepository> _reactionsRepositoryMock;
    private readonly Mock<IUserAccessor> _userAccessorMock;
    private readonly Mock<IServiceHelper<ReactionsService>> _serviceHelperMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly string UserId = "fake-user-id";

    public ReactionsServiceTests()
    {
        _reactionsRepositoryMock = new Mock<IReactionsRepository>();
        _userAccessorMock = new Mock<IUserAccessor>();
        _serviceHelperMock = new Mock<IServiceHelper<ReactionsService>>();
        _mapperMock = new Mock<IMapper>();

        _serviceHelperMock.SetupExecuteSafe<ReactionsService, List<ReactionDto>>();
        _serviceHelperMock.SetupExecuteSafe<ReactionsService, Dictionary<string, Dictionary<ReactionType, int>>>();
        _serviceHelperMock.SetupExecuteSafe<ReactionsService, ReactionDto>();

        _userAccessorMock
            .Setup(x => x.GetUserId())
            .Returns(UserId);

        _reactionsService = new ReactionsService(
            _reactionsRepositoryMock.Object,
            _serviceHelperMock.Object,
            _mapperMock.Object,
            _userAccessorMock.Object
        );
    }

    [Fact]
    public async Task GetReactionsByProductIdAndAuthorId_ReturnsExpectedReactions()
    {
        // Arrange
        string productId = "fake-product-id";

        // Arrange - Entities
        var reactions = new List<Reactions>
        {
            new ReactionBuilder()
                .WithProductId(productId)
                .WithReaction(ReactionType.like)
                .Build(),
            new ReactionBuilder()
                .Build()
        };

        // Arrange - Dtos
        var expectedReactionDtos = new List<ReactionDto>
        {
            new ReactionDtoBuilder()
                .WithProductId(reactions[0].Id)
                .WithReaction(reactions[0].Reaction)
                .Build(),
            new ReactionDtoBuilder()
                .WithProductId(reactions[1].Id)
                .Build()
        };

        _reactionsRepositoryMock
            .Setup(x => x.GetByProductIdAndAuthorIdAsync(
                It.Is<string>(r => r == productId),
                It.Is<string>(a => a == UserId)
            ))
            .ReturnsAsync(reactions);

        _mapperMock
            .Setup(x => x.Map<List<ReactionDto>>(reactions))
            .Returns(expectedReactionDtos);

        //Act
        var result = await _reactionsService.GetReactionsByProductIdAndAuthorId(productId);

        //Assert
        _mapperMock.Verify(
            x => x.Map<List<ReactionDto>>(reactions),
            Times.Once()
        );
        _reactionsRepositoryMock.Verify(x => x.GetByProductIdAndAuthorIdAsync(
                It.Is<string>(r => r == productId),
                It.Is<string>(a => a == UserId)
            ), Times.Once);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(expectedReactionDtos, options => options.WithoutStrictOrdering());

    }

    [Fact]
    public async Task GetReactionsByProductIdAndAuthorId_WhenProductIdNotFound_ReturnsEmptyResult()
    {
        // Arrange
        string productId = "id-product-not-fount";

        // Arrange - Entities
        var emptyReactions = new List<Reactions> { };

        // Arrange - Dtos
        var expectedReactionDtos = new List<ReactionDto> { };

        _reactionsRepositoryMock
            .Setup(x => x.GetByProductIdAndAuthorIdAsync(
                It.Is<string>(p => p == productId),
                It.Is<string>(a => a == UserId)
            ))
            .ReturnsAsync(emptyReactions);

        _mapperMock
            .Setup(x => x.Map<List<ReactionDto>>(emptyReactions))
            .Returns(expectedReactionDtos);

        //Act
        var result = await _reactionsService.GetReactionsByProductIdAndAuthorId(productId);

        //Assert
        _mapperMock.Verify(
            x => x.Map<List<ReactionDto>>(emptyReactions),
            Times.Once()
        );
        _reactionsRepositoryMock.Verify(
            x => x.GetByProductIdAndAuthorIdAsync(
                It.Is<string>(p => p == productId),
                It.Is<string>(a => a == UserId)
            ),
            Times.Once()
        );
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEmpty();
        result.Value.Should().BeEquivalentTo(expectedReactionDtos, options => options.WithoutStrictOrdering());
    }

    [Fact]
    public async Task GetReviewsTotalReactions_ShouldReturnMappedReactionCounts_WhenReviewIdsAreValid()
    {
        //Arrange
        var reviewIds = new List<string> { "id-1", "id-2" };

        // Arrange - ReviewReactionCountDto
        var fakeResults = new List<ReviewReactionCountDto>
            {
                new() { ReviewId = "id-1", Reaction = ReactionType.like, Total = 3 },
                new() { ReviewId = "id-2", Reaction = ReactionType.love, Total = 5 }
            };

        _reactionsRepositoryMock
            .Setup(x => x.GetReviewsTotalReactionsAsync(
                It.Is<List<string>>(r => r.SequenceEqual(reviewIds))
            ))
            .ReturnsAsync(fakeResults);

        //Act
        var result = await _reactionsService.GetReviewsTotalReactions(reviewIds);

        //Assert
        var firstResult = fakeResults[0];
        var secondResult = fakeResults[1];

        _reactionsRepositoryMock.Verify(
            x => x.GetReviewsTotalReactionsAsync(
                It.Is<List<string>>(r => r.SequenceEqual(reviewIds))
            ),
            Times.Once()
        );
        result.IsSuccess.Should().BeTrue();
        result.Value![firstResult.ReviewId][firstResult.Reaction].Should().Be(firstResult.Total);
        result.Value![secondResult.ReviewId][secondResult.Reaction].Should().Be(secondResult.Total);
        result.Value.Should().HaveCount(2);
        result.Value.Keys.Should().BeEquivalentTo(reviewIds);

    }

    [Fact]
    public async Task GetReviewsTotalReactions_ShouldReturnEmpty_WhenReviewsNotFound()
    {
        // Arrage
        var reviewsIds = new List<string> { "id-1", "id-2" };

        // Arrange - ReviewReactionCountDto
        var fakeResults = new List<ReviewReactionCountDto> { };

        _reactionsRepositoryMock
            .Setup(x => x.GetReviewsTotalReactionsAsync(
                It.Is<List<string>>(r => r.SequenceEqual(reviewsIds))
            ))
            .ReturnsAsync(fakeResults);

        //Act
        var result = await _reactionsService.GetReviewsTotalReactions(reviewsIds);

        //Assert
        _reactionsRepositoryMock
            .Verify(x => x.GetReviewsTotalReactionsAsync(
                It.Is<List<string>>(r => r.SequenceEqual(reviewsIds))
            ), Times.Once());
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEmpty();
    }

    [Fact]
    public async Task CreateReaction_ReturnsSuccess()
    {
        //Arrange - CreateReactionDto
        var createReactionDto = new CreateReactionDtoBuilder()
            .Build();

        // Arrange - Entity
        var reaction = new ReactionBuilder()
            .WithAuthorId(UserId)
            .WithReviewId(createReactionDto.ReviewId)
            .WithProductId(createReactionDto.ProductId)
            .WithReaction(createReactionDto.Reaction)
            .Build();

        // Arrange - ReactionDto
        var reactionDto = new ReactionDtoBuilder()
            .WithAuthorId(UserId)
            .WithReviewId(createReactionDto.ReviewId)
            .WithProductId(createReactionDto.ProductId)
            .WithReaction(createReactionDto.Reaction)
            .Build();

        _reactionsRepositoryMock
            .Setup(x => x.InsertAsync(It.Is<CreateReactionDto>(r =>
                r.ProductId == createReactionDto.ProductId &&
                r.AuthorId == UserId &&
                r.ReviewId == createReactionDto.ReviewId &&
                r.Reaction == createReactionDto.Reaction)
            ))
            .ReturnsAsync(reaction);

        _mapperMock
            .Setup(x => x.Map<ReactionDto>(reaction))
            .Returns(reactionDto);

        //Act
        var result = await _reactionsService.CreateReaction(createReactionDto);

        //Assert
        _reactionsRepositoryMock
            .Verify(x => x.InsertAsync(It.Is<CreateReactionDto>(r =>
                r.ProductId == createReactionDto.ProductId &&
                r.AuthorId == UserId &&
                r.ReviewId == createReactionDto.ReviewId &&
                r.Reaction == createReactionDto.Reaction)
            ), Times.Once());

        _mapperMock
            .Verify(x => x.Map<ReactionDto>(reaction), Times.Once());

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(reactionDto, options => options.WithoutStrictOrdering());
    }

    [Fact]
    public async Task CreateReaction_WhenReactionAlreadyExists_Throws_ReturnsFailure()
    {
        //Arrange - CreateReactionDto
        var createReactionDto = new CreateReactionDtoBuilder()
            .Build();

        // Arrange Duplicate Key Exception
        var duplicateKeyEx = MongoTestHelpers.CreateDuplicateKeyException();

        _reactionsRepositoryMock
            .Setup(x => x.InsertAsync(It.Is<CreateReactionDto>(r =>
                r.ProductId == createReactionDto.ProductId &&
                r.AuthorId == UserId &&
                r.ReviewId == createReactionDto.ReviewId &&
                r.Reaction == createReactionDto.Reaction)))
            .ThrowsAsync(duplicateKeyEx);

        //Act
        var result = await _reactionsService.CreateReaction(createReactionDto);

        //Assert
        _reactionsRepositoryMock
            .Verify(x => x.InsertAsync(It.Is<CreateReactionDto>(r =>
                r.ProductId == createReactionDto.ProductId &&
                r.AuthorId == UserId &&
                r.ReviewId == createReactionDto.ReviewId &&
                r.Reaction == createReactionDto.Reaction)
            ), Times.Once());

        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be("Reaction already exists");
        result.Code.Should().Be(400);
    }

    [Fact]
    public async Task UpdateReaction_ValidDto_ReturnsSuccess()
    {
        // Arrange - Reaction Id
        var reactionId = "reaction-id";

        //Arrange - UpdateReactionDto
        var updateReactionDto = new UpdateReactionDtoBuilder()
            .WithAuthorId(UserId)
            .Build();

        //Arrange - Entity
        var reaction = new ReactionBuilder()
            .WithReviewId(updateReactionDto.ReviewId)
            .WithReaction(updateReactionDto.Reaction)
            .WithAuthorId(updateReactionDto.AuthorId!)
            .Build();

        //Arrange - Dto
        var reactionDto = new ReactionDtoBuilder()
            .WithId(reaction.Id)
            .WithAuthorId(reaction.AuthorId)
            .WithReviewId(reaction.ReviewId)
            .WithProductId(reaction.ProductId)
            .WithReaction(reaction.Reaction)
            .Build();

        _reactionsRepositoryMock
            .Setup(x => x.UpdateAsync(
                It.Is<string>(s => s == reactionId),
                It.Is<UpdateReactionDto>(u =>
                    u.AuthorId == updateReactionDto.AuthorId &&
                    u.ReviewId == updateReactionDto.ReviewId &&
                    u.Reaction == updateReactionDto.Reaction
                )
            ))
            .ReturnsAsync(reaction);

        _mapperMock
            .Setup(x => x.Map<ReactionDto>(reaction))
            .Returns(reactionDto);

        //Act
        var result = await _reactionsService.UpdateReaction(reactionId, updateReactionDto);

        //Assert
        _reactionsRepositoryMock
            .Verify(x => x.UpdateAsync(
                It.Is<string>(s => s == reactionId),
                It.Is<UpdateReactionDto>(u =>
                    u.AuthorId == updateReactionDto.AuthorId &&
                    u.ReviewId == updateReactionDto.ReviewId &&
                    u.Reaction == updateReactionDto.Reaction
                )
            ), Times.Once());

        _mapperMock
            .Verify(x => x.Map<ReactionDto>(reaction), Times.Once());

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeEquivalentTo(reactionDto, options => options.WithoutStrictOrdering());
    }

}
