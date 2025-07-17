using System;

namespace Application.DTOs.Products;

public class ProductDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public double? Rating { get; set; }
    public int TotalReviews { get; set; }

}

