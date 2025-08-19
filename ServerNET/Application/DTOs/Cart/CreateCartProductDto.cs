using System;

namespace Application.DTOs.Cart;

public class CreateCartProductDto
{
    public string? UserId { get; set; }
    public string ProductId { get; set; } = string.Empty;
    public int Quantity { get; set; } = 0;
}
