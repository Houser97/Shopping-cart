using System;
using Application.Aggregates;
using Application.DTOs.Products;
using Application.DTOs.Reactions;
using Application.DTOs.Reviews;
using Application.DTOs.User;
using AutoMapper;
using Domain.Entities;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica la fuente del mapeo y hacia donde se mapea.
        CreateMap<ProductWithReviews, ProductDto>();
        CreateMap<User, UserDto>();
        CreateMap<User, ReviewUserDto>();
        CreateMap<Reactions, ReactionDto>();
        CreateMap<ReviewWithDetails, ReviewDto>();
        CreateMap<Review, ReviewDto>();
    }
}
