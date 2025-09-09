using Application.DTOs.Reactions;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionsController(
        IReactionsService reactionsService
    ) : ControllerBase
    {

        private readonly IReactionsService _reactionsService = reactionsService;

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetReviewsTotalReactions()
        {
            var reviewIds = new List<string> { "669098c2d320479fd751770b", "6697405a916b46594c94b2ee", "684753490c18edfeb4cdef42", "66c23ca1b99b41183ab91210" };
            var result = await _reactionsService.GetReviewsTotalReactions(reviewIds);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpGet("{productId}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetReactionsByProductIdAndUserId(string productId)
        {
            var result = await _reactionsService.GetReactionsByProductIdAndAuthorId(productId);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpPost]
        public async Task<ActionResult> CreateReaction([FromBody] CreateReactionDto createReactionDto)
        {
            var result = await _reactionsService.CreateReaction(createReactionDto);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateReaction(string id, UpdateReactionDto updateReactionDto)
        {
            var result = await _reactionsService.UpdateReaction(id, updateReactionDto);

            if (!result.IsSuccess)
                return StatusCode(result.Code, new { message = result.Error });

            return Ok(result.Value);
        }
    }
}
