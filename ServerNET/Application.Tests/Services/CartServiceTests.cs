using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Cart;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Application.Tests.Builders.Cart;
using Application.Tests.Builders.Products;
using Application.Tests.Helpers;
using AutoMapper;
using Domain.Entities;
using FluentAssertions;
using Moq;

namespace Application.Tests.Services;

public class CartServiceTests
{
    private readonly Mock<ICartRepository> _cartRepositoryMock;
    private readonly Mock<IServiceHelper<CartService>> _serviceHelperMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IUserAccessor> _userAccessorMock;
    private readonly CartService _cartService;
    private readonly string UserId = "fake-user-id";

    public CartServiceTests()
    {
        _cartRepositoryMock = new Mock<ICartRepository>();
        _serviceHelperMock = new Mock<IServiceHelper<CartService>>();
        _mapperMock = new Mock<IMapper>();
        _userAccessorMock = new Mock<IUserAccessor>();

        _userAccessorMock
            .Setup(x => x.GetUserId())
            .Returns(UserId);

        _serviceHelperMock
            .Setup(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<List<CartProductDto>>>>>()))
            .Returns((Func<Task<Result<List<CartProductDto>>>> func) => func());

        _serviceHelperMock
            .Setup(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<CartProductDto>>>>()))
            .Returns((Func<Task<Result<CartProductDto>>> func) => func());

        _cartService = new CartService(
            _cartRepositoryMock.Object,
            _serviceHelperMock.Object,
            _mapperMock.Object,
            _userAccessorMock.Object
        );
    }

    [Fact]
    public async Task GetUserCartProducts_ReturnsCorrectCartProducts()
    {
        // Arrange - Products
        var productEntity1 = new ProductBuilder()
            .WithId("fake-product-id-1")
            .WithAuthorId("author-1")
            .WithTitle("Mouse")
            .WithPrice(79.99m)
            .WithImages("img1.png", "img2.png")
            .Build();

        var productEntity2 = new ProductBuilder()
            .WithId("fake-product-id-2")
            .WithAuthorId("author-2")
            .WithTitle("Keyboard")
            .WithPrice(69.59m)
            .WithImages("img3.png", "img4.png")
            .Build();

        // Arrange - Carts
        var cartEntity1 = new CartBuilder()
            .WithId("cart-product-1")
            .WithQuantity(2)
            .WithProductId(productEntity1.Id)
            .WithUserId("client-1")
            .Build();

        var cartEntity2 = new CartBuilder()
            .WithId("cart-product-2")
            .WithQuantity(1)
            .WithProductId(productEntity2.Id)
            .WithUserId("client-2")
            .Build();

        // Arrange - CartProductWithDetails
        var fakeUserCart = new List<CartProductWithDetails>
        {
            new CartProductWithDetailsBuilder()
                .WithCart(cartEntity1)
                .WithProduct(productEntity1)
                .Build(),
            new CartProductWithDetailsBuilder()
                .WithCart(cartEntity2)
                .WithProduct(productEntity2)
                .Build()
        };

        // Arrange - Expected DTOs
        var fakeUserCartDtos = new List<CartProductDto>
        {
            new CartProductDtoBuilder()
                .WithQuantity(fakeUserCart[0].Quantity)
                .WithPrice((double)fakeUserCart[0].Product.Price)
                .Build(),
            new CartProductDtoBuilder()
                .WithQuantity(fakeUserCart[1].Quantity)
                .WithPrice((double)fakeUserCart[1].Product.Price)
                .Build()
        };

        _cartRepositoryMock
            .Setup(x => x.GetAllByUserIdAsync(
                It.Is<string>(r => r == UserId),
                It.IsAny<CancellationToken>()
            ))
            .ReturnsAsync(fakeUserCart);

        _mapperMock
            .Setup(x => x.Map<List<CartProductDto>>(fakeUserCart))
            .Returns(fakeUserCartDtos);

        //Act
        var result = await _cartService.GetUserCartProducts();

        //Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.Should().HaveCount(2);
        result.Value!.Should().BeEquivalentTo(fakeUserCartDtos, options => options.WithoutStrictOrdering());
        _cartRepositoryMock
            .Verify(x => x.GetAllByUserIdAsync(UserId, It.IsAny<CancellationToken>()), Times.Once());
        _mapperMock
            .Verify(x => x.Map<List<CartProductDto>>(fakeUserCart), Times.Once());
    }

    [Fact]
    public async Task GetUserCartProducts_WhenNoProducts_ReturnsEmptyList()
    {
        //Arrange
        var fakeUserCart = new List<CartProductWithDetails> { };
        var fakeUserCartDtos = new List<CartProductDto> { };

        _cartRepositoryMock
            .Setup(x => x.GetAllByUserIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(fakeUserCart);

        _mapperMock
            .Setup(x => x.Map<List<CartProductDto>>(fakeUserCart))
            .Returns(fakeUserCartDtos);

        //Act
        var result = await _cartService.GetUserCartProducts();

        //Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.Should().BeEmpty();
        _cartRepositoryMock
            .Verify(x => x.GetAllByUserIdAsync(UserId, It.IsAny<CancellationToken>()), Times.Once());
        _mapperMock.Verify(x => x.Map<List<CartProductDto>>(fakeUserCart), Times.Once());
    }

    [Fact]
    public async Task CreateCartProduct_ReturnsCartProduct()
    {

        //Arrange CreateCartProductDto
        var fakeCreateProductDto = new CreateCartProductDtoBuilder()
            .WithProductId("product-id")
            .WithQuantity(2)
            .WithUserId(UserId)
            .Build();

        // Arrange - Product
        var productEntity = new ProductBuilder()
            .WithId(fakeCreateProductDto.ProductId)
            .WithAuthorId("author-1")
            .WithTitle("Mouse")
            .WithPrice(79.99m)
            .WithImages("img1.png", "img2.png")
            .Build();

        // Arrange - Cart
        var cartEntity = new CartBuilder()
            .WithId("cart-product-1")
            .WithQuantity(fakeCreateProductDto.Quantity)
            .WithProductId(productEntity.Id)
            .WithUserId(UserId)
            .Build();


        //Arrange CartProductWithDetails
        var fakeCreatedProductCart = new CartProductWithDetailsBuilder()
            .WithProduct(productEntity)
            .WithCart(cartEntity)
            .Build();


        var fakeProductDto = new CartProductDtoBuilder()
            .WithId(fakeCreatedProductCart.Id)
            .WithProductId(fakeCreatedProductCart.ProductId)
            .WithUserId(fakeCreatedProductCart.UserId)
            .WithQuantity(fakeCreatedProductCart.Quantity)
            .Build();

        _cartRepositoryMock
            .Setup(x => x.InsertAsync(
                It.Is<CreateCartProductDto>(r =>
                    r.UserId == fakeCreateProductDto.UserId &&
                    r.ProductId == fakeCreateProductDto.ProductId &&
                    r.Quantity == fakeCreateProductDto.Quantity
                ),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(fakeCreatedProductCart);

        _mapperMock
            .Setup(r => r.Map<CartProductDto>(fakeCreatedProductCart))
            .Returns(fakeProductDto);

        //Act
        var result = await _cartService.CreateCartProduct(fakeCreateProductDto);

        //Assert
        _cartRepositoryMock
            .Verify(x => x.InsertAsync(It.Is<CreateCartProductDto>(r =>
                    r.UserId == fakeCreateProductDto.UserId &&
                    r.ProductId == fakeCreatedProductCart.ProductId &&
                    r.Quantity == fakeCreatedProductCart.Quantity
                ),
                It.IsAny<CancellationToken>()), Times.Once());
        _mapperMock.Verify(x => x.Map<CartProductDto>(fakeCreatedProductCart), Times.Once());
        result.Value!.Should().BeEquivalentTo(fakeProductDto, options => options.WithoutStrictOrdering());
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task CreateCartProduct_WhenDuplicateKey_Throws_ReturnsFailure()
    {
        // Arrange
        var fakeCreateProductDto = new CreateCartProductDtoBuilder()
            .WithUserId(UserId)
            .WithProductId("product-id")
            .WithQuantity(4)
            .Build();

        var duplicateKeyEx = MongoTestHelpers.CreateDuplicateKeyException();

        _cartRepositoryMock
            .Setup(x => x.InsertAsync(It.IsAny<CreateCartProductDto>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(duplicateKeyEx);

        // Act
        var result = await _cartService.CreateCartProduct(fakeCreateProductDto);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be("Product is already in the cart");
        result.Code.Should().Be(400);

        _cartRepositoryMock
            .Verify(x => x.InsertAsync(
                It.Is<CreateCartProductDto>(r =>
                    r.UserId == UserId &&
                    r.ProductId == fakeCreateProductDto.ProductId &&
                    r.Quantity == fakeCreateProductDto.Quantity
                ),
                It.IsAny<CancellationToken>()),
                Times.Once());

    }

    [Fact]
    public async Task DeleteCartProduct_ReturnsSuccess()
    {
        //Arrange
        var fakeDeletedCartEntity = new CartBuilder()
            .WithQuantity(3)
            .WithProductId("product-id")
            .WithUserId(UserId)
            .WithId("cart-id")
            .Build();

        var fakeProductDto = new CartProductDtoBuilder()
            .WithId(fakeDeletedCartEntity.Id)
            .WithUserId(fakeDeletedCartEntity.UserId)
            .WithProductId(fakeDeletedCartEntity.ProductId)
            .WithQuantity(fakeDeletedCartEntity.Quantity)
            .Build();

        _cartRepositoryMock
            .Setup(x => x.DeleteByIdAsync(It.Is<string>(r => r == fakeDeletedCartEntity.Id), It.IsAny<CancellationToken>()))
            .ReturnsAsync(fakeDeletedCartEntity);

        _mapperMock
            .Setup(x => x.Map<CartProductDto>(fakeDeletedCartEntity))
            .Returns(fakeProductDto);

        //Act
        var result = await _cartService.DeleteCartProduct(fakeProductDto.Id);

        //Assert
        result.IsSuccess.Should().BeTrue();
        result.Value!.Should().BeEquivalentTo(fakeProductDto, options => options.WithoutStrictOrdering());
        _cartRepositoryMock
            .Verify(x => x.DeleteByIdAsync(
                It.Is<string>(r => r == fakeProductDto.Id),
                It.IsAny<CancellationToken>()),
                Times.Once());
        _mapperMock
            .Verify(x => x.Map<CartProductDto>(fakeDeletedCartEntity), Times.Once());
    }

    [Fact]
    public async Task DeleteCartProduct_ProductDoesNotExist_ReturnsFailure()
    {
        //Arrange
        string productId = "1";

        _cartRepositoryMock
            .Setup(x => x.DeleteByIdAsync(It.Is<string>(r => r == productId), It.IsAny<CancellationToken>()))
            .ReturnsAsync((Cart?)null);

        //Act
        var result = await _cartService.DeleteCartProduct(productId);

        // Assert
        _cartRepositoryMock
            .Verify(x => x.DeleteByIdAsync(It.Is<string>(r => r == productId), It.IsAny<CancellationToken>()), Times.Once());
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be($"Cart product with id: {productId} not found");
        result.Code.Should().Be(404);
    }

    [Fact]
    public async Task UpdateCartProduct_ReturnsSuccess()
    {
        //Arrange
        string productId = "1";
        var fakeUpdateDto = new UpdateCartProductDto
        {
            Quantity = 1
        };

        // Arrange - Product
        var productEntity = new ProductBuilder()
            .WithId("fake-product-id-2")
            .WithAuthorId("author-2")
            .WithTitle("Keyboard")
            .WithPrice(69.59m)
            .WithImages("img3.png", "img4.png")
            .Build();

        // Arrange - Cart
        var cartEntity = new CartBuilder()
            .WithId("cart-product-1")
            .WithQuantity(fakeUpdateDto.Quantity)
            .WithProductId(productEntity.Id)
            .WithUserId(UserId)
            .Build();

        // Arrange - CartProductWithDetails
        var fakeUpdatedProductCart = new CartProductWithDetailsBuilder()
            .WithProduct(productEntity)
            .WithCart(cartEntity)
            .Build();


        // Arrange - ProductDto
        var fakeProductDto = new CartProductDtoBuilder()
            .WithId(fakeUpdatedProductCart.Id)
            .WithUserId(fakeUpdatedProductCart.UserId)
            .WithProductId(fakeUpdatedProductCart.ProductId)
            .WithQuantity(fakeUpdatedProductCart.Quantity)
            .Build();

        _cartRepositoryMock
            .Setup(x => x.UpdateAsync(
                It.Is<string>(r => r == productId),
                It.Is<UpdateCartProductDto>(r => r.Quantity == fakeUpdateDto.Quantity),
                It.IsAny<CancellationToken>()
                ))
            .ReturnsAsync(fakeUpdatedProductCart);

        _mapperMock
            .Setup(x => x.Map<CartProductDto>(fakeUpdatedProductCart))
            .Returns(fakeProductDto);

        //Act
        var result = await _cartService.UpdateCartProduct(productId, fakeUpdateDto);

        //Assert
        _cartRepositoryMock
            .Verify(x => x.UpdateAsync(productId, fakeUpdateDto, It.IsAny<CancellationToken>()), Times.Once());
        _mapperMock.Verify(x => x.Map<CartProductDto>(fakeUpdatedProductCart), Times.Once());
        result.IsSuccess.Should().BeTrue();
        result.Value!.Should().BeEquivalentTo(fakeProductDto, options => options.WithoutStrictOrdering());
    }

    [Fact]
    public async Task UpdateCartProduct_ProductDoesNotExist_ReturnsFailure()
    {
        //Arrange
        string productId = "1";
        var fakeUpdateDto = new UpdateCartProductDto
        {
            Quantity = 1
        };

        _cartRepositoryMock
            .Setup(x => x.UpdateAsync(
                It.Is<string>(r => r == productId),
                It.IsAny<UpdateCartProductDto>(),
                It.IsAny<CancellationToken>()
            ))
            .ReturnsAsync((CartProductWithDetails?)null);

        //Act
        var result = await _cartService.UpdateCartProduct(productId, fakeUpdateDto);

        //Assert
        _cartRepositoryMock
            .Verify(x => x.UpdateAsync(
                It.Is<string>(r => r == productId),
                It.IsAny<UpdateCartProductDto>(),
                It.IsAny<CancellationToken>()
            ), Times.Once());
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be($"Cart product with id: {productId} could not be updated");
        result.Code.Should().Be(404);
    }

    [Fact]
    public async Task ClearUserCart_ReturnsSuccess()
    {
        //Arrange
        _serviceHelperMock
            .Setup(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<bool>>>>()))
            .Returns((Func<Task<Result<bool>>> func) => func());

        _cartRepositoryMock
            .Setup(x => x.ClearAllAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        //Act
        var result = await _cartService.ClearUserCart();

        //Assert
        _serviceHelperMock
            .Verify(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<bool>>>>()), Times.Once());
        _cartRepositoryMock
            .Verify(x => x.ClearAllAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once());
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(true);
    }
}
