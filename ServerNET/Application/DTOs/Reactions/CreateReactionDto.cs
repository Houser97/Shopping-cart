using System;
using Domain.Enums;

namespace Application.DTOs.Reactions;

public class CreateReactionDto
{
    public required string ProductId { get; set; }
    public required string ReviewId { get; set; }
    public required string AuthorId { get; set; }
    public required ReactionType Reaction { get; set; }
}
