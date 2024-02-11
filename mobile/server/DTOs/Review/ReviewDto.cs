namespace server.DTOs
{
    public class ReviewDto
    {
        public string Id { get; init; } = string.Empty;
        public string Author { get; init; } = string.Empty;
        public int Rating { get; set; }
        public List<string> Likes { get; init; } = [];
        public List<string> Dislikes { get; init; } = [];
        public DateTime Date { get; init; }
        public string Comment { get; init; } = string.Empty;
    }
}