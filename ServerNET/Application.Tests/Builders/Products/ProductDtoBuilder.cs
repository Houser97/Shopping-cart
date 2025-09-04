using System;
using Application.DTOs.Products;
using Domain.Entities;

namespace Application.Tests.Builders.Products;

public class ProductDtoBuilder
{
    private string _id = Guid.NewGuid().ToString();
    private string _title = "Generic title";
    private decimal _price = 100;
    private double? _rating = 0;
    private int _totalReviews = 0;
    private List<Review> _reviews = [];

    public ProductDtoBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public ProductDtoBuilder WithTitle(string title)
    {
        _title = title;
        return this;
    }

    public ProductDtoBuilder WithPrice(decimal price)
    {
        _price = price;
        return this;
    }

    public ProductDtoBuilder WithRating(double rating)
    {
        _rating = rating;
        return this;
    }

    public ProductDtoBuilder WithTotalReviews(int totalReviews)
    {
        _totalReviews = totalReviews;
        return this;
    }

    public ProductDtoBuilder WithReviews(List<Review> reviews)
    {
        _reviews = reviews;
        return this;
    }

    public ProductDto Build()
    {
        return new ProductDto
        {
            Id = _id,
            Title = _title,
            Price = _price,
            Rating = _rating,
            TotalReviews = _totalReviews,
            Reviews = _reviews
        };
    }

}
