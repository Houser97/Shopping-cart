import { Reaction } from "../../domain/entities/reaction";
import { ReactionDBResponse } from "../interfaces/reaction-db.response";

export class ReactionMapper {
    static fromDbCastToEntity(reaction: ReactionDBResponse): Reaction {

        return {
            id: reaction.id,
            authorId: reaction.authorId,
            reviewId: reaction.reviewId,
            reaction: reaction.reaction
        }
    }


    static reactionsToReviewIdObject(reactions: ReactionDBResponse[]): { [key: string]: Reaction } {
        return reactions.reduce((prev, reaction) => {
            const { reviewId } = reaction;
            const key = reviewId.toString();

            return { ...prev, [key]: reaction };
        }, {});
    }
}