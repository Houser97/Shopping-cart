using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public record class Review
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; init; } = String.Empty;
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        [BsonElement("author")]
        public string Author { get; init; } = String.Empty;
        [BsonElement("item")]
        public int Item { get; set; }
        [BsonElement("rating")]
        public int Rating { get; set; }
        [BsonElement("likes")]
        public List<string> Likes { get; init; } = [];
        [BsonElement("dislikes")]
        public List<string> Dislikes { get; init; } = [];
        [BsonElement("date")]
        public DateTime Date { get; init; } = DateTime.UtcNow;
        [BsonElement("comment")]
        public string Comment { get; init; } = String.Empty;
        [BsonIgnoreIfDefault]
        [BsonElement("__v")]
        public int? VersionKey { get; set; }
    }
}
