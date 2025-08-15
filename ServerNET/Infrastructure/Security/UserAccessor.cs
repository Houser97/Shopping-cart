using System;
using System.Security.Claims;
using Application.Interfaces.Accessors;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security;

public class UserAccessor(
    IHttpContextAccessor httpContextAccessor
) : IUserAccessor
{
    public string? GetEmail()
        => httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);


    public string? GetUserId()
        => httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? GetUsername()
        => httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Name);

}
