import { Reaction, ReactionsReviewIdObject } from "../entities/reaction";

export abstract class ReactionDatasource {
    abstract getReactions(productId: string): Promise<ReactionsReviewIdObject>;
    abstract createReaction(productId: string, reviewId: string, authorId: string, reaction: string): Promise<Reaction>;
    abstract updateReaction(id: string, reviewId: string, authorId: string, reaction: string): Promise<Reaction>;
    abstract deleteReaction(id: string, reviewId: string, authorId: string): Promise<Reaction>;
}