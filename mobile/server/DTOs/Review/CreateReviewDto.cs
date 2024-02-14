namespace server.DTOs
{
    public class CreateReviewDto
    {
        public string Author { get; set; } = string.Empty;
        public int Rating { get; set; }
        public int Item { get; set; }
        public string Comment { get; set; } = string.Empty;

    }
}