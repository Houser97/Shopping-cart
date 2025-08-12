using System;
using Application.Core;
using Application.DTOs.Reactions;
using Application.Interfaces;
using Application.Interfaces.Repositories;
using Application.Mappers;
using AutoMapper;
using Domain.Enums;

namespace Application.Services;

public class ReactionsService(
    IReactionsRepository reactionsRepository,
    IServiceHelper<ReactionsService> serviceHelper,
    IMapper mapper
) : IReactionsService
{

    private readonly IReactionsRepository _reactionsRepository = reactionsRepository;
    private readonly IServiceHelper<ReactionsService> _serviceHelper = serviceHelper;

    private readonly IMapper _mapper = mapper;

    public async Task<Result<ReactionDto>> CreateReaction(CreateReactionDto createReactionDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var result = await _reactionsRepository.InsertAsync(createReactionDto);

            var reactionDto = _mapper.Map<ReactionDto>(result);

            return Result<ReactionDto>.Success(reactionDto);
        });
    }

    public async Task<Result<List<ReactionDto>>> GetReactionsByProductIdAndAuthorId(string productId, string authorId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var reactions = await _reactionsRepository.GetByProductIdAndAuthorIdAsync(productId, authorId);

            var reactionsDtos = _mapper.Map<List<ReactionDto>>(reactions);
            return Result<List<ReactionDto>>.Success(reactionsDtos);
        });
    }

    public async Task<Result<Dictionary<string, Dictionary<ReactionType, int>>>> GetReviewsTotalReactions(List<string> reviewIds)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var results = await _reactionsRepository.GetReviewsTotalReactionsAsync(reviewIds);

            var mapped = ReactionMapper.MapToReviewReactionCount(results);

            return Result<Dictionary<string, Dictionary<ReactionType, int>>>.Success(mapped);
        });
    }

    public async Task<Result<ReactionDto>> UpdateReaction(string id, UpdateReactionDto updateReactionDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var result = await _reactionsRepository.UpdateAsync(id, updateReactionDto);
            var reactionDto = _mapper.Map<ReactionDto>(result);

            return Result<ReactionDto>.Success(reactionDto);
        });
    }

}
