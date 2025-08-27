using System;
using Domain.Entities;

namespace Application.Tests.Builders.Products;

public class ProductBuilder
{
    private readonly Product _product = new();

    public ProductBuilder WithId(string id)
    {
        _product.Id = id;
        return this;
    }

    public ProductBuilder WithAuthorId(string authorId)
    {
        _product.AuthorId = authorId;
        return this;
    }

    public ProductBuilder WithTitle(string title)
    {
        _product.Title = title;
        return this;
    }

    public ProductBuilder WithPrice(decimal price)
    {
        _product.Price = price;
        return this;
    }

    public ProductBuilder WithImages(params string[] images)
    {
        _product.Images = images;
        return this;
    }

    public ProductBuilder WithDescription(string description)
    {
        _product.Description = description;
        return this;
    }

    public ProductBuilder WithCreatedAt(DateTime createdAt)
    {
        _product.CreatedAt = createdAt;
        return this;
    }

    public Product Build() => _product;

}
