using MongoDB.Bson;
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class ReviewsService
    {
        private readonly IMongoCollection<Review> _reviews;

        public ReviewsService(IDatabaseCollections collections, IMongoDatabase database)
        {
            _reviews = database.GetCollection<Review>(collections.ReviewsCollection);
        }

        public async Task<List<Review>> GetAll() => await _reviews.Find(FilterDefinition<Review>.Empty).ToListAsync();

        public async Task<Review> GetById(string id)
        {
            var objectId = ObjectId.Parse(id);
            var filter = Builders<Review>.Filter.Eq("_id", objectId);

            return await _reviews.Find(filter).FirstOrDefaultAsync();
        }

    }
}