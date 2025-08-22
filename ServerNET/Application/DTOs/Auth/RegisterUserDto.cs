using System;

namespace Application.DTOs.Auth;

public class RegisterUserDto : BaseAuthDto
{
    public string Name { get; set; } = null!;

}
