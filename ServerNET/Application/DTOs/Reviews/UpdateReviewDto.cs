using System;

namespace Application.DTOs.Reviews;

public class UpdateReviewDto
{
    public required string AuthorId { get; set; }
    public required string Comment { get; set; }
    public required int Rating { get; set; }

}
