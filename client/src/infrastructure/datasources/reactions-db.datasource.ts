import shoppingApi from "../../config/api/shoppingApi";

import { ReactionDatasource } from "../../domain/datasources/reactions.datasource";
import { Reaction, ReactionsReviewIdObject } from "../../domain/entities/reaction";

import { CustomError } from "../errors/custom.error";
import { ReactionDBResponse } from "../interfaces/reaction-db.response";
import { ReactionMapper } from "../mappers/reaction.mapper";


export class ReactionDbDatasource extends ReactionDatasource {

    async getReactions(productId: string): Promise<ReactionsReviewIdObject> {
        try {
            const { data } = await shoppingApi.get<ReactionDBResponse[]>(`/reactions/${productId}`);
            if (!Object.keys(data).length) return {}
            return ReactionMapper.reactionsToReviewIdObject(data);
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
            const { data } = await shoppingApi.put<ReactionDBResponse>(`/reactions/${id}`, {
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