using System;
using Application.Aggregates;
using Domain.Entities;

namespace Application.Tests.Builders.Cart;

public class CartProductWithDetailsBuilder
{
    private readonly CartProductWithDetails _cartProduct = new();

    public CartProductWithDetailsBuilder WithCart(Domain.Entities.Cart cart)
    {
        _cartProduct.Id = cart.Id;
        _cartProduct.ProductId = cart.ProductId;
        _cartProduct.UserId = cart.UserId;
        _cartProduct.Quantity = cart.Quantity;
        _cartProduct.CreatedAt = cart.CreatedAt;
        return this;
    }

    public CartProductWithDetailsBuilder WithProduct(Product product)
    {
        _cartProduct.Product = product;
        return this;
    }

    public CartProductWithDetails Build() => _cartProduct;
}
