using System;

namespace API.Responses;

public class ErrorResponse
{
    public Dictionary<string, string[]> Errors { get; set; }

    public ErrorResponse(string field, string message)
    {
        Errors = new Dictionary<string, string[]>
        {
            { field, new[] { message } }
        };
    }

    public ErrorResponse(Dictionary<string, string[]> errors)
    {
        Errors = errors;
    }

    // For general errors without a specific field
    public ErrorResponse(string message)
    {
        Errors = new Dictionary<string, string[]>
        {
            { "general", new[] { message } }
        };
    }
}
