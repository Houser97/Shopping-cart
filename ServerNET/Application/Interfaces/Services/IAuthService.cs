using System;
using Application.Core;
using Application.DTOs.Auth;

namespace Application.Interfaces.Services;

public interface IAuthService
{
    Task<Result<AuthResultDto>> Login(LoginUserDto loginUserDto);
    Task<Result<AuthResultDto>> Register(RegisterUserDto registerUserDto);
    Task<Result<AuthResultDto>> GetAuthenticatedUser();
}
