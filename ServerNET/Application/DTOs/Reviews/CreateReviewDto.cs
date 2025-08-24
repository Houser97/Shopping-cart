using System;

namespace Application.DTOs.Reviews;

public class CreateReviewDto
{
    public required string ProductId { get; set; }
    public string? AuthorId { get; set; }
    public required string Comment { get; set; }
    public required int Rating { get; set; }

}
