using System;

namespace Application.Tests.Builders.User;

public class UserBuilder
{
    private string _id = Guid.NewGuid().ToString();
    private string _email = $"{Guid.NewGuid()}@email.com";
    private string _password = Guid.NewGuid().ToString();
    private string _username = Guid.NewGuid().ToString();

    public UserBuilder WithId(string id)
    {
        _id = id;
        return this;
    }

    public UserBuilder WithEmail(string email)
    {
        _email = email;
        return this;
    }

    public UserBuilder WithPassword(string password)
    {
        _password = password;
        return this;
    }

    public UserBuilder WithUsername(string username)
    {
        _username = username;
        return this;
    }

    public Domain.Entities.User Build()
    {
        return new Domain.Entities.User
        {
            Id = _id,
            Email = _email,
            Password = _password,
            Username = _username
        };
    }
}
