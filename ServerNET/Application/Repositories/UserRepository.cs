using System;
using Application.Interfaces.Repositories;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Persistence;
using Persistence.Interfaces;

namespace Application.Repositories;

public class UserRepository(
    IAppDbContext dbContext,
    IOptions<AppDbSettings> settings
) : IUserRepository
{

    private readonly IMongoCollection<User> _usersCollection =
        dbContext.Database.GetCollection<User>(settings.Value.UsersCollectionName);

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
    }

    public async Task<User?> GetByIdAsync(string userId)
    {
        return await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
    }

    public async Task InsertUserAsync(User user)
    {
        await _usersCollection.InsertOneAsync(user);
    }
}
