using System;
using Application.DTOs.Cart;

namespace Application.Tests.Builders;

#pragma warning disable IDE0044
public class CartProductDtoBuilder
{
    private string _id = Guid.NewGuid().ToString();
    private string _userId = Guid.NewGuid().ToString();
    private string _productId = Guid.NewGuid().ToString();
    private int _quantity = 1;
    private double _price = 10;
    private string _image = "default image";
    private string _name = "default name";

    public CartProductDtoBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public CartProductDtoBuilder WithUserId(string userId)
    {
        _userId = userId;
        return this;
    }

    public CartProductDtoBuilder WithProductId(string productId)
    {
        _productId = productId;
        return this;
    }

    public CartProductDtoBuilder WithQuantity(int quantity)
    {
        _quantity = quantity;
        return this;
    }

    public CartProductDtoBuilder WithPrice(double price)
    {
        _price = price;
        return this;
    }

    public CartProductDtoBuilder WithName(string name)
    {
        _name = name;
        return this;
    }

    public CartProductDto Build()
    {
        return new CartProductDto
        {
            Id = _id,
            UserId = _userId,
            ProductId = _productId,
            Quantity = _quantity,
            Price = _price,
            Image = _image,
            Name = _name
        };
    }
}
