using System.Text.Json;
using Application.Core;
using Application.Services;
using Persistence;
using Persistence.Configurations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped(typeof(ServiceHelper<>));
// Database
MongoDbConventions.Register();

builder.Services.Configure<AppDbSettings>(
    builder.Configuration.GetSection("Database")
);

builder.Services.AddSingleton<AppDbContext>();

builder.Services.AddScoped<ProductsService>();
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