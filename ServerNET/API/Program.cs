using System.Text.Json;
using Application.Core;
using Application.Interfaces;
using Application.Services;
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

builder.Services.AddSingleton<IAppDbContext, AppDbContext>();

builder.Services.AddScoped<IProductsService, ProductsService>();
builder.Services.AddScoped<IReviewsService, ReviewsService>();
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