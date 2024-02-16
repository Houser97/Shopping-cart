using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.DTOs;
using server.Mappers;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {

        private readonly ReviewsService _reviewsService;
        public ReviewsController(ReviewsService reviewsService)
        {
            _reviewsService = reviewsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Realiza una consulta para obtener todas las reviews
            var reviews = await _reviewsService.GetAll();

            // Se usa Mapper para aplicar DTO

            var reviewsDto = reviews.Select(review => review.ToReviewDto());

            return Ok(reviewsDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var review = await _reviewsService.GetById(id);
            Console.WriteLine(review);
            return Ok(review);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReviewDto reviewDto)
        {
            var reviewModel = reviewDto.ToReviewFromCreateDTO();
            await _reviewsService.Create(reviewModel);
            return CreatedAtAction(nameof(GetById), new { id = reviewModel.Id }, reviewModel.ToReviewDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var res = await _reviewsService.Delete(id);

            if (res == null)
                return NotFound();

            return NoContent();

        }

    }

}