using System;

namespace Application.DTOs.Reactions;

public class ReactionDto
{
    public string Id { get; set; } = string.Empty;
    public string AuthorId { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;
    public string ReviewId { get; set; } = string.Empty;
    public string Reaction { get; set; } = string.Empty;
}
