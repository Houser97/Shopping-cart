import shoppingApi from "../../config/api/shoppingApi";

import { ReactionDatasource } from "../../domain/datasources/reactions.datasource";
import { Reaction, ReactionsReviewIdObject } from "../../domain/entities/reaction";

import { CustomError } from "../errors/custom.error";
import { ReactionDBResponse, ReactionDBResponseNest } from "../interfaces/reaction-db.response";
import { ReactionMapper } from "../mappers/reaction.mapper";


export class ReactionDbDatasource extends ReactionDatasource {

    async getReactions(productId: string): Promise<ReactionsReviewIdObject> {
        try {
            const { data } = await shoppingApi.get<ReactionDBResponseNest>(`/reactions/product/${productId}`);
            const reactionsDb = data.data;
            if (!Object.keys(reactionsDb).length) return {}
            return ReactionMapper.reactionsToReviewIdObject(reactionsDb);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }

    async createReaction(productId: string, reviewId: string, authorId: string, reaction: string): Promise<Reaction> {
        try {
            const { data } = await shoppingApi.post<ReactionDBResponse>('/reactions', { productId, reviewId, authorId, reaction, });
            return ReactionMapper.fromDbCastToEntity(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }

    async updateReaction(id: string, reviewId: string, authorId: string, reaction: string): Promise<Reaction> {
        try {
            const { data } = await shoppingApi.patch<ReactionDBResponse>(`/reactions/${id}`, {
                reviewId,
                authorId,
                reaction
            });
            // const updatedReaction = ReactionMapper.fromDbCastToEntity(data);
            return data;
        } catch (error) {
            throw CustomError.formatError(error);
        }

    };

    async deleteReaction(id: string): Promise<Reaction> {
        try {
            const { data } = await shoppingApi.delete<ReactionDBResponse>(`/reactions/${id}`);
            return ReactionMapper.fromDbCastToEntity(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
}