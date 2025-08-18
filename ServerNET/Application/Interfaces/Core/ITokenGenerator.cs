using System;
using Domain.Entities;

namespace Application.Interfaces.Core;

public interface ITokenGenerator
{
    string GenerateToken(User user);
}
