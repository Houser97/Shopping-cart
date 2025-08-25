using System;
using Application.Core;
using Application.DTOs.Auth;
using Application.Interfaces.Accessors;
using Application.Interfaces.Core;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using BCrypt.Net;

namespace Application.Services;

public class AuthService(
    IUserRepository userRepository,
    IUserAccessor userAccessor,
    IServiceHelper<AuthService> serviceHelper,
    ITokenGenerator tokenGenerator
) : IAuthService
{

    private readonly IUserRepository _userRepository = userRepository;
    private readonly IUserAccessor _userAccessor = userAccessor;
    private readonly ITokenGenerator _tokenGenerator = tokenGenerator;
    private readonly IServiceHelper<AuthService> _serviceHelper = serviceHelper;

    public async Task<Result<AuthResultDto>> GetAuthenticatedUser()
    {
        var userId = _userAccessor.GetUserId();

        if (userId == null)
            return Result<AuthResultDto>.Failure("User is not authenticated", 400);

        var user = await _userRepository.GetByIdAsync(userId);

        var authResultDto = new AuthResultDto
        {
            User = user!
        };

        return Result<AuthResultDto>.Success(authResultDto);
    }

    public async Task<Result<AuthResultDto>> Login(LoginUserDto loginUserDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var user = await _userRepository.GetByEmailAsync(loginUserDto.Email);

            if (user == null)
                return Result<AuthResultDto>.Failure("User does not exists", 404);

            bool passwordMatches = BCrypt.Net.BCrypt.Verify(loginUserDto.Password, user.Password);

            if (!passwordMatches)
                return Result<AuthResultDto>.Failure("Password is incorrect", 400);

            var token = _tokenGenerator.GenerateToken(user);
            user.Password = "";

            var authResultDto = new AuthResultDto
            {
                User = user,
                Token = token
            };

            return Result<AuthResultDto>.Success(authResultDto);
        });
    }

    public async Task<Result<AuthResultDto>> Register(RegisterUserDto registerUserDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var userExists = await _userRepository.GetByEmailAsync(registerUserDto.Email);

            if (userExists != null)
                return Result<AuthResultDto>.Failure("User already exists", 400);

            var user = new Domain.Entities.User
            {
                Email = registerUserDto.Email,
                Username = registerUserDto.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password),
            };

            await _userRepository.InsertUserAsync(user);

            user.Password = null!;

            var token = _tokenGenerator.GenerateToken(user);

            var authResultDto = new AuthResultDto
            {
                Token = token,
                User = user
            };

            return Result<AuthResultDto>.Success(authResultDto);
        });
    }
}
