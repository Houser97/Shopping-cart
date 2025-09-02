using System;
using Application.Core;
using Application.DTOs.Reactions;
using Application.Interfaces.Accessors;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Mappers;
using AutoMapper;
using Domain.Enums;
using MongoDB.Driver;

namespace Application.Services;

public class ReactionsService(
    IReactionsRepository reactionsRepository,
    IServiceHelper<ReactionsService> serviceHelper,
    IMapper mapper,
    IUserAccessor userAccessor
) : IReactionsService
{

    private readonly IReactionsRepository _reactionsRepository = reactionsRepository;
    private readonly IServiceHelper<ReactionsService> _serviceHelper = serviceHelper;
    private readonly IUserAccessor _userAccessor = userAccessor;

    private readonly IMapper _mapper = mapper;

    public async Task<Result<ReactionDto>> CreateReaction(CreateReactionDto createReactionDto)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            try
            {
                var userId = _userAccessor.GetUserId();
                createReactionDto.AuthorId = userId;

                var result = await _reactionsRepository.InsertAsync(createReactionDto);

                var reactionDto = _mapper.Map<ReactionDto>(result);

                return Result<ReactionDto>.Success(reactionDto);
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                return Result<ReactionDto>.Failure("Reaction already exists", 400);
            }
        });
    }

    public async Task<Result<List<ReactionDto>>> GetReactionsByProductIdAndAuthorId(string productId)
    {
        return await _serviceHelper.ExecuteSafeAsync(async () =>
        {
            var authorId = _userAccessor.GetUserId();
            var reactions = await _reactionsRepository.GetByProductIdAndAuthorIdAsync(productId, authorId!);

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
            var userId = _userAccessor.GetUserId();
            updateReactionDto.AuthorId = userId;

            var result = await _reactionsRepository.UpdateAsync(id, updateReactionDto);

            if (result == null)
                return Result<ReactionDto>.Failure("Reaction not found or not owned by user", 404);

            var reactionDto = _mapper.Map<ReactionDto>(result);

            return Result<ReactionDto>.Success(reactionDto);
        });
    }

}
