using Application.DTOs.Reviews;
using Application.Interfaces.Services;
using Application.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController(IReviewsService reviewsService) : ControllerBase
    {

        private readonly IReviewsService _reviewsService = reviewsService;

        [HttpGet("product/{productId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetReviewsByProductId(
            string productId,
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10
        )
        {
            var paginationDto = new PaginationDto
            {
                Page = page,
                Limit = limit
            };

            var result = await _reviewsService.GetReviewsAsync(productId, paginationDto);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetReviewById(string id)
        {
            var result = await _reviewsService.GetReviewById(id);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpGet("user/{productId}")]
        public async Task<ActionResult> GetReviewsByProductIdAndUserId(string productId)
        {
            var result = await _reviewsService.GetReviewByProductIdAndUserId(productId);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpPost]
        public async Task<ActionResult> CreateReview(CreateReviewDto createReviewDto)
        {
            var result = await _reviewsService.CreateReview(createReviewDto);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReview(string id, UpdateReviewDto updateReviewDto)
        {
            var result = await _reviewsService.UpdateReview(id, updateReviewDto);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReview(string id)
        {
            var result = await _reviewsService.DeleteReview(id);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }
    }
}
