using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
        public async Task<IActionResult> GetReviews()
        {
            // Realiza una consulta para obtener todas las reviews
            var reviews = await _reviewsService.GetAll();

            return Ok(reviews);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            var review = await _reviewsService.GetById(id);
            Console.WriteLine(review);
            return Ok(review);
        }
    }

}