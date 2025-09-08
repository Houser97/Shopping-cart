using System;

namespace Application.DTOs.Products;

public class CreateProductDto
{
    public string Title { get; set; } = string.Empty;
    public string[] Images { get; set; } = [];
    public decimal Price { get; set; } = 0;
    public string AuthorId { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
