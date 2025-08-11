using System;
using Domain.Entities;

namespace Application.Aggregates;

public class ReviewWithDetails : Review
{
    public List<Reactions> Reactions { get; set; } = [];
    public required User Author { get; set; }
}
