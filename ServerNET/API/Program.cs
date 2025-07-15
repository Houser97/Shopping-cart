using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Database
builder.Services.Configure<AppDbSettings>(
    builder.Configuration.GetSection("Database")
);

builder.Services.AddSingleton<AppDbContext>();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapControllers();

app.Run();