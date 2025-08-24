using System;

namespace Application.DTOs.Auth;

public class AuthResultDto
{
    public string Token { get; set; } = string.Empty;
    public Domain.Entities.User User { get; set; } = default!;
}
