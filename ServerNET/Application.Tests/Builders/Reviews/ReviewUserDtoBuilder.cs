using System;
using Application.DTOs.User;

namespace Application.Tests.Builders.Reviews;

public class ReviewUserDtoBuilder
{
    private string _id = Guid.NewGuid().ToString();
    private string _username = Guid.NewGuid().ToString();

    public ReviewUserDtoBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public ReviewUserDtoBuilder WithUsername(string username)
    {
        _username = username;
        return this;
    }

    public ReviewUserDto Build()
    {
        return new ReviewUserDto
        {
            Id = _id,
            Username = _username
        };
    }
}
