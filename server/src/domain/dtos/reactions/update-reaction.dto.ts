import { Validators } from "../../../config/validators";
import { ReactionType } from "../../../data/mongo/models/reaction.model";

export class UpdateReactionDto {
    private constructor(
        public readonly reviewId: string,
        public readonly authorId: string,
        public readonly reaction: string,
    ) { }


    static create(props: { [key: string]: any }): [string?, UpdateReactionDto?] {
        const {
            reviewId,
            authorId,
            reaction
        } = props


        if (!Validators.isMongoID(authorId)) return ['Invalid User ID'];
        if (!Validators.isMongoID(reviewId)) return ['Invalid Review ID'];

        if (!reaction) return ['Missing reaction'];
        if (!Object.values(ReactionType).includes(reaction)) return ['Reaction is not valid'];

        return [undefined, new UpdateReactionDto(reviewId, authorId, reaction)];
    }
}