using System;
using Application.DTOs.Cart;

namespace Application.Tests.Builders.Cart;

public class CreateCartProductDtoBuilder
{
    private string _userId { get; set; } = Guid.NewGuid().ToString();
    private string _productId { get; set; } = Guid.NewGuid().ToString();
    private int _quantity { get; set; } = 0;

    public CreateCartProductDtoBuilder WithUserId(string userId)
    {
        _userId = userId;
        return this;
    }

    public CreateCartProductDtoBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public CreateCartProductDtoBuilder WithQuantity(int quantity)
    {
        _quantity = quantity;
        return this;
    }

    public CreateCartProductDto Build()
    {
        return new CreateCartProductDto
        {
            UserId = _userId,
            ProductId = _productId,
            Quantity = _quantity
        };
    }
}
