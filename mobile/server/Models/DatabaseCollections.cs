namespace server.Models
{
    public record class DatabaseCollections : IDatabaseCollections
    {
        public string ReviewsCollection { get; set; } = "reviews";
        public string UsersCollection { get; set; } = "users";
        public string ProductsCollection { get; set; } = "products";
    }

    public interface IDatabaseCollections
    {
        public string ReviewsCollection { get; set; }
        public string UsersCollection { get; set; }
        public string ProductsCollection { get; set; }
    }
}
