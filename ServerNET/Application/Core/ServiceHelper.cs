using System;
using Microsoft.Extensions.Logging;

namespace Application.Core;

public class ServiceHelper<T>(ILogger<T> logger)
{
    private readonly ILogger<T> _logger = logger;

    public async Task<Result<TResult>> ExecuteSafeAsync<TResult>(Func<Task<Result<TResult>>> operation)
    {
        try
        {
            return await operation();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception in service operation");
            return Result<TResult>.Failure("Internal Server Error", 500);
        }
    }
}
