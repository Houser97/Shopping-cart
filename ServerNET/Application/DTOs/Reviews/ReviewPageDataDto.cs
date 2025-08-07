using System;
using Domain.Enums;

namespace Application.DTOs.Reviews;

public class ReviewPageDataDto
{
    public List<ReviewDto> Reviews { get; set; } = [];
    public Dictionary<string, Dictionary<ReactionType, int>> TotalReactions { get; set; } = [];
}
