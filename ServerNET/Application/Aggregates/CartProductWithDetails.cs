using System;
using Domain.Entities;

namespace Application.Aggregates;

public class CartProductWithDetails : Cart
{
    public Product Product { get; set; } = default!;
}
