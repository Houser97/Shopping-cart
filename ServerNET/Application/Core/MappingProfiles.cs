using System;
using Application.DTOs;
using Application.DTOs.Products;
using AutoMapper;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica la fuente del mapeo y hacia donde se mapea.
        CreateMap<ProductWithReviews, ProductDto>();
    }
}
