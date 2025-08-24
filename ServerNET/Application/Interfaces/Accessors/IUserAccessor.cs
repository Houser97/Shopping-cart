using System;

namespace Application.Interfaces.Accessors;

public interface IUserAccessor
{
    string? GetUserId();
    string? GetUsername();
    string? GetEmail();
}
