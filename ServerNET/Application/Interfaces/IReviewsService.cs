using System;
using Application.Core;
using Application.DTOs.Reviews;
using Application.Shared;

namespace Application.Interfaces;

public interface IReviewsService
{
    Task<Result<PagedReviewsResultDto>> GetReviewsAsync(string productId, PaginationDto paginationDto);

}
