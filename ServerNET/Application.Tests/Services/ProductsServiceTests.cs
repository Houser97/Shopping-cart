using System;
using Application.Aggregates;
using Application.Core;
using Application.DTOs.Products;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using AutoMapper;
using Moq;

namespace Application.Tests.Services;

public class ProductsServiceTests
{
    private readonly ProductsService _productService;
    private readonly Mock<IProductsRepository> _productsRepositoryMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<IServiceHelper<ProductsService>> _serviceHelperMock;

    public ProductsServiceTests()
    {
        _productsRepositoryMock = new Mock<IProductsRepository>();
        _mapperMock = new Mock<IMapper>();
        _serviceHelperMock = new Mock<IServiceHelper<ProductsService>>();

        _serviceHelperMock
            .Setup(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<ProductDto[]>>>>()))
            .Returns((Func<Task<Result<ProductDto[]>>> func) => func());

        _serviceHelperMock
            .Setup(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<ProductDto>>>>()))
            .Returns((Func<Task<Result<ProductDto>>> func) => func());

        _productService = new ProductsService(
            _productsRepositoryMock.Object,
            _mapperMock.Object,
            _serviceHelperMock.Object
        );
    }

    [Fact]
    public async Task GetProductsAsync_ReturnsExpectedProducts()
    {
        // Arrange
        var fakeDomainProducts = new List<ProductWithReviews>
        {
            new () { Id = "1", Title = "Fake Domain Product 1", Price = 120, Rating = 4, TotalReviews = 0, Reviews = [] },
            new () { Id = "2", Title = "Fake Domain Product 2", Price = 50, Rating = 5, TotalReviews = 0, Reviews = [] }
        };

        var fakeProductsDto = new List<ProductDto>
        {
            new() { Id = "1", Title = "Fake Domain Product 1", Price = 120, Rating = 4, TotalReviews = 0, Reviews = [] },
            new() { Id = "2", Title = "Fake Domain Product 2", Price = 50, Rating = 5, TotalReviews = 0, Reviews = [] },
        }.ToArray();

        _productsRepositoryMock
            .Setup(x => x.GetProductsAsync())
            .ReturnsAsync(fakeDomainProducts);

        _mapperMock
            .Setup(m => m.Map<ProductDto[]>(fakeDomainProducts))
            .Returns(fakeProductsDto);

        // Act
        var result = await _productService.GetProductsAsync();

        // Assert
        Assert.True(result.IsSuccess);
        Assert.Equal(2, result.Value!.Length);
        Assert.Equal("Fake Domain Product 1", result.Value[0].Title);
        Assert.Equal("Fake Domain Product 2", result.Value[1].Title);
    }

    [Fact]
    public async Task GetProductById_ReturnsSuccess()
    {
        // Arrange
        var fakeDomainProducts = new ProductWithReviews
        {
            Id = "1",
            Title = "Fake Domain Product 1",
            Price = 120,
            Rating = 4,
            TotalReviews = 0,
            Reviews = []
        };

        var fakeProductDto = new ProductDto
        {
            Id = "1",
            Title = "Fake Domain Product 1",
            Price = 120,
            Rating = 4,
            TotalReviews = 0,
            Reviews = []
        };

        _productsRepositoryMock
            .Setup(x => x.GetProductByIdAsync(It.Is<string>(e => string.Equals(e, "1"))))
            .ReturnsAsync(fakeDomainProducts);

        _mapperMock
            .Setup(x => x.Map<ProductDto>(fakeDomainProducts))
            .Returns(fakeProductDto);

        // Act
        var result = await _productService.GetProductById("1");

        // Assert
        Assert.True(result.IsSuccess);
    }

    [Fact]
    public async Task GetProductById_WhenProductDoesNotExist_ReturnsFailure()
    {
        //Arrange
        _productsRepositoryMock
            .Setup(x => x.GetProductByIdAsync(It.IsAny<string>()))
            .ReturnsAsync((ProductWithReviews?)null);

        // Act
        var result = await _productService.GetProductById("1");

        // Arrange
        Assert.False(result.IsSuccess);
        Assert.Equal(404, result.Code);
    }

}
