using System;

namespace Application.Tests.Builders.Cart;

public class CartBuilder
{
    private readonly Domain.Entities.Cart _cart = new();

    public CartBuilder WithId(string id)
    {
        _cart.Id = id;
        return this;
    }

    public CartBuilder WithUserId(string userId)
    {
        _cart.UserId = userId;
        return this;
    }

    public CartBuilder WithProductId(string productId)
    {
        _cart.ProductId = productId;
        return this;
    }

    public CartBuilder WithQuantity(int quantity)
    {
        _cart.Quantity = quantity;
        return this;
    }

    public CartBuilder WithCreatedAt(DateTime createdAt)
    {
        _cart.CreatedAt = createdAt;
        return this;
    }

    public Domain.Entities.Cart Build() => _cart;
}
