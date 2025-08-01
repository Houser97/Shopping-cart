using System;
using Domain.Entities;

namespace Application.Aggregates;

public class ProductWithReviews : Product
{
    public List<Review> Reviews { get; set; } = [];
    public double? Rating { get; set; }
    public int TotalReviews { get; set; }
}