using System;
using Application.DTOs.Reactions;
using Application.DTOs.User;

namespace Application.DTOs.Reviews;

public class ReviewDto
{
    public string Id { get; set; } = string.Empty;
    public string AuthorId { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<ReactionDto> Reactions { get; set; } = [];
    public required ReviewUserDto Author { get; set; }
}
