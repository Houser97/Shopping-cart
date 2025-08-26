using Application.DTOs.Auth;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(
        IAuthService authService
    ) : ControllerBase
    {

        private readonly IAuthService _authService = authService;

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            var result = await _authService.Login(loginUserDto);

            if (!result.IsSuccess)
            {
                return BadRequest(new { message = result.Error });
            }

            return Ok(new
            {
                user = result.Value!.User,
                token = result.Value.Token
            });
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        {
            Console.WriteLine(registerUserDto);
            var result = await _authService.Register(registerUserDto);

            if (!result.IsSuccess)
            {
                return BadRequest(new { message = result.Error });
            }

            return Ok(new
            {
                user = result.Value!.User,
                token = result.Value.Token
            });
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetStatus()
        {
            var result = await _authService.GetAuthenticatedUser();

            if (!result.IsSuccess)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                user = result.Value!.User
            });
        }
    }
}
