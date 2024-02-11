using server.DTOs;
using server.Models;

namespace server.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewDto ToReviewDto(this Review reviewModel)
        {
            return new ReviewDto
            {
                Id = reviewModel.Id,
                Author = reviewModel.Author,
                Comment = reviewModel.Comment,
            };
        }
    }
}