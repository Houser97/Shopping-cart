using API.Responses;
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
                return BadRequest(new ErrorResponse(result.Error ?? "Login failed"));
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
            var result = await _authService.Register(registerUserDto);
            if (!result.IsSuccess)
            {
                return BadRequest(new ErrorResponse(result.Error ?? "Registration failed"));
            }
            return Ok(new
            {
                user = result.Value!.User,
                token = result.Value.Token
            });
        }

        [HttpGet("status")]
        [AllowAnonymous]
        public async Task<IActionResult> GetStatus()
        {
            var result = await _authService.GetAuthenticatedUser();

            if (!result.IsSuccess)
            {
                return Unauthorized(new ErrorResponse(result.Error ?? "Unauthorized"));
            }

            return Ok(new
            {
                user = result.Value!.User
            });
        }
    }
}
