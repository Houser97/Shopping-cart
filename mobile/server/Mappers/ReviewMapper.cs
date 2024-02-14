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
                Rating = reviewModel.Rating,
                Likes = reviewModel.Likes,
                Dislikes = reviewModel.Dislikes,
                Date = reviewModel.Date,
                Comment = reviewModel.Comment,
            };
        }

        public static Review ToReviewFromCreateDTO(this CreateReviewDto reviewDto)
        {
            return new Review
            {
                Author = reviewDto.Author,
                Rating = reviewDto.Rating,
                Item = reviewDto.Item,
                Comment = reviewDto.Comment,
            };
        }
    }
}