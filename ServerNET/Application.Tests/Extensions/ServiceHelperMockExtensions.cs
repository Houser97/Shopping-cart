using System;
using Application.Core;
using Application.Interfaces.Services;
using Moq;

namespace Application.Tests.Extensions;

public static class ServiceHelperMockExtensions
{
    public static void SetupExecuteSafe<TService, TResult>(this Mock<IServiceHelper<TService>> mock)
    {
        mock
            .Setup(x => x.ExecuteSafeAsync(It.IsAny<Func<Task<Result<TResult>>>>()))
            .Returns((Func<Task<Result<TResult>>> func) => func());
    }
}
