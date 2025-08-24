using System;

namespace Application.DTOs.Auth;

public class BaseAuthDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
