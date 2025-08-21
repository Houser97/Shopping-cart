using System;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Application.DTOs.Reactions;

public class CreateReactionDto
{
    public required string ProductId { get; set; }
    public required string ReviewId { get; set; }
    public string? AuthorId { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))] // Ayuda a poder mandar el string en la request en lugar del entero del enum
    public required ReactionType Reaction { get; set; }
}
