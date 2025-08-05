using System;

namespace Application.Core;

public class PagedResult<T>
{
    public int Page { get; init; }
    public int Limit { get; init; }
    public long Total { get; init; }
    public int TotalPages { get; init; }
    public string? Next { get; init; }
    public string? Prev { get; init; }
    public T Data { get; init; } = default!;
}
