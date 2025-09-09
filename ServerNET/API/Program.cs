using System.Text;
using System.Text.Json;
using Application.Core;
using Application.Interfaces.Accessors;
using Application.Interfaces.Core;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Repositories;
using Application.Services;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Persistence;
using Persistence.Configurations;
using Persistence.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Application.DTOs.Auth;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped(typeof(IServiceHelper<>), typeof(ServiceHelper<>));

// JWT configuration
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt")
);

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings?.Issuer,
        ValidAudience = jwtSettings?.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings!.Key))
    };
});

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build());

builder.Services.AddSingleton<ITokenGenerator, JwtTokenGenerator>();



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

// Repositories
builder.Services.AddScoped<IReviewsRepository, ReviewsRepository>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<IReactionsRepository, ReactionsRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Services
builder.Services.AddScoped<IProductsService, ProductsService>();
builder.Services.AddScoped<IReviewsService, ReviewsService>();
builder.Services.AddScoped<IReactionsService, ReactionsService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Accessors
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();

// DatabaseInitializer
builder.Services.AddScoped<DatabaseInitializer>();

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

// FluentValidation
builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();

builder.Services.AddValidatorsFromAssemblyContaining<BaseAuthDto>();

var app = builder.Build();

// DatabaseInitializer
using (var scope = app.Services.CreateScope())
{
    var dbInitializer = scope.ServiceProvider.GetRequiredService<DatabaseInitializer>();
    await dbInitializer.InitializeAsync();
}

// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:5173", "https://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();