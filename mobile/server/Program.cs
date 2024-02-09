using dotenv.net;
using MongoDB.Driver;
using server.Models;
using server.Services;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = new ConfigurationBuilder().AddEnvironmentVariables().Build();

// Configure MongoDB connection
var mongoClient = new MongoClient(configuration["ConnectionString"]);
var databaseName = configuration["DatabasetName"];
var database = mongoClient.GetDatabase(databaseName);

// Register MongoDB database instance as a service
builder.Services.AddSingleton<IMongoDatabase>(database);

// Register DatabaseCollections
builder.Services.AddSingleton<IDatabaseCollections, DatabaseCollections>();

// Register ReviewsService
builder.Services.AddSingleton<ReviewsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
