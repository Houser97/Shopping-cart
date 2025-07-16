using System.Text.Json;
using Persistence;
using Persistence.Configurations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Database
MongoDbConventions.Register();

builder.Services.Configure<AppDbSettings>(
    builder.Configuration.GetSection("Database")
);

builder.Services.AddSingleton<AppDbContext>();

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