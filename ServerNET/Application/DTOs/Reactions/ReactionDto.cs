using System;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Application.DTOs.Reactions;

public class ReactionDto
{
    public string Id { get; set; } = string.Empty;
    public string AuthorId { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;
    public string ReviewId { get; set; } = string.Empty;

    [JsonConverter(typeof(JsonStringEnumConverter))] // Ayuda a recibir la reacción como string en lugar de un número al momento de retornar lo insertado
    public ReactionType Reaction { get; set; }
}
