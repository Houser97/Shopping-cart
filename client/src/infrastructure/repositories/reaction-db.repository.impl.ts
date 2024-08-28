import { ReactionDatasource } from "../../domain/datasources/reactions.datasource";
import { Reaction, ReactionsReviewIdObject } from "../../domain/entities/reaction";
import { ReactionRepository } from "../../domain/repositories/reactions.repository";


export class ReactionRepositoryImpl extends ReactionRepository {

    constructor(
        private datasource: ReactionDatasource
    ) {
        super()
    }


    async getReactions(productId: string): Promise<ReactionsReviewIdObject> {
        return this.datasource.getReactions(productId);
    }

    async createReaction(productId: string, reviewId: string, authorId: string, reaction: string): Promise<Reaction> {
        return this.datasource.createReaction(productId, reviewId, authorId, reaction);
    }

    async updateReaction(id: string, reviewId: string, authorId: string, reaction: string): Promise<Reaction> {
        return this.datasource.updateReaction(id, reviewId, authorId, reaction);
    }

    deleteReaction(id: string): Promise<Reaction> {
        return this.datasource.deleteReaction(id);
    }
}