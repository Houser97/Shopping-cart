using System.Text.Json;
using Application.Core;
using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Repositories;
using Application.Services;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Persistence;
using Persistence.Configurations;
using Persistence.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped(typeof(IServiceHelper<>), typeof(ServiceHelper<>));
// Database
MongoDbConventions.Register();

builder.Services.Configure<AppDbSettings>(
    builder.Configuration.GetSection("Database")
);

// MongoClient como Singleton (thread-safe)
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<AppDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

// AppDbContext como Scoped (usa MongoClient pero mantiene contexto del request)
builder.Services.AddScoped<IAppDbContext, AppDbContext>();

builder.Services.AddScoped<IReviewsRepository, ReviewsRepository>();

builder.Services.AddScoped<IProductsService, ProductsService>();
builder.Services.AddScoped<IReviewsService, ReviewsService>();
builder.Services.AddScoped<IReactionsService, ReactionsService>();
builder.Services.AddScoped<ICartService, CartService>();

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapControllers();

app.Run();