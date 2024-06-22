import { ReactionModel } from "../../data/mongo/models/reaction.model";
import { ReviewModel } from "../../data/mongo/models/review.model";
import { CreateReactionDto } from "../../domain/dtos/reactions/create-reaction.dto";
import { ReactionEntity } from "../../domain/entities/reaction.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class ReactionService {
    constructor() { }

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
}