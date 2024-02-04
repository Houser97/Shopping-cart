namespace server.Models
{
    public record class Review
    {
        public string Author { get; init; } = String.Empty;
        public string Id { get; init; } = String.Empty;
        public List<string> Like { get; init; } = [];
        public List<string> Dislikes { get; init; } = [];
        public DateTime Date { get; init; }
        public string Comment { get; init; } = String.Empty;
    }
}
