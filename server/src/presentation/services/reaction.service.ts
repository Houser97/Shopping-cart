import mongoose from "mongoose";
import { ReactionModel } from "../../data/mongo/models/reaction.model";
import { ReviewModel } from "../../data/mongo/models/review.model";
import { CreateReactionDto } from "../../domain/dtos/reactions/create-reaction.dto";
import { UpdateReactionDto } from "../../domain/dtos/reactions/update-reaction.dto";
import { ReactionEntity } from "../../domain/entities/reaction.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class ReactionService {
    constructor() { }


    async get(productId: string, authorId: string) {
        if (authorId.length === 0) return {}

        try {
            const productObjectId = new mongoose.Types.ObjectId(productId);
            const authorObjectId = new mongoose.Types.ObjectId(authorId);

            const reactions = await ReactionModel.find({
                productId: productObjectId,
                authorId: authorObjectId
            });

            return reactions.map(ReactionEntity.fromObject);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getTotalReactions(reviewsId: string[]) {
        try {
            const reviewsObjectId = reviewsId.map(id => new mongoose.Types.ObjectId(id));

            const totalReactions = await ReactionModel.aggregate([
                { $match: { reviewId: { $in: reviewsObjectId } } },
                {
                    $group: {
                        _id: { reaction: "$reaction", reviewId: "$reviewId" },
                        total: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        reviewId: "$_id.reviewId",
                        reaction: "$_id.reaction",
                        total: 1
                    }
                }
            ]);

            return ReactionEntity.reactionsCountToReviewIdObject(totalReactions);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async create(createReactionDto: CreateReactionDto) {
        const { reviewId, authorId } = createReactionDto;

        const reviewExistsPromise = ReviewModel.findById(reviewId);
        const reactionExistsPromise = ReactionModel.findOne({ authorId, reviewId })

        const [
            reviewExists,
            reactionExists
        ] = await Promise.all([
            reviewExistsPromise,
            reactionExistsPromise
        ])

        if (!reviewExists) throw CustomError.badRequest('Review does not exist');
        if (reactionExists) throw CustomError.badRequest('User has already reacted to the review');

        try {
            const reaction = new ReactionModel(createReactionDto);

            await reaction.save();
            const reactionEntity = ReactionEntity.fromObject(reaction);

            return reactionEntity;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async update(id: string, updateReactionDto: UpdateReactionDto) {
        const { authorId, reaction, reviewId } = updateReactionDto;

        const reactionExists = await ReactionModel.findOne({ authorId, reviewId })
        if (!reactionExists) throw CustomError.notFound('Reaction was not found');

        try {
            await ReactionModel.findByIdAndUpdate(id, { reaction });
            return updateReactionDto;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }
}