using System;
using Domain.Entities;

namespace Application.DTOs.Products;

public class ProductDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public double? Rating { get; set; }
    public int TotalReviews { get; set; }
    public List<string> Images { get; set; } = [];
    public List<Review> Reviews { get; set; } = [];

}

