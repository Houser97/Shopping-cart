'use server'
import shoppingApi from "@/config/api/shoppingApiAxios";
import { Reaction, ReactionsReviewIdObject } from "@/domain/entities/reaction";
import { CustomError } from "@/infrastructure/errors/custom.error";
import { ReactionDBResponse, ReactionDBResponseNest } from "@/infrastructure/interfaces/reaction-db.response";
import { ReactionMapper } from "@/infrastructure/mappers/reaction.mapper";
import { reactionRepositoryProvider } from "@/providers/reaction-repository.provider";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";


export const getReactions = async (productId: string): Promise<ReactionsReviewIdObject> => {
    const cookieHeader = await getCookie('Authentication', { cookies })

    try {
        const { data } = await shoppingApi.get<ReactionDBResponseNest>(`/reactions/product/${productId}`, {
            headers: {
                Cookie: `Authentication=${cookieHeader}`
            }
        });
        const reactionsDb = data.data;
        if (!Object.keys(reactionsDb).length) return {}
        return ReactionMapper.reactionsToReviewIdObject(reactionsDb);
    } catch (error) {
        console.log(error)
        throw CustomError.formatError(error);
    }
}



export const createReaction = async (productId: string, reviewId: string, authorId: string, reaction: string) => {
    try {
        const createdReaction = await reactionRepositoryProvider.createReaction(productId, reviewId, authorId, reaction);
        return createdReaction;
    } catch (error) {
        // if (error.status === 401) {
        //     toast('Login to make this operation', ToastTypes.ERROR);
        // } else {
        //     toast(error.message, ToastTypes.ERROR);
        // }
        console.log(error);
        return false;
    }
}

export const updateReaction = async (id: string, reviewId: string, authorId: string, newReaction: string) => {
    try {
        const updatedReaction = await reactionRepositoryProvider.updateReaction(id, reviewId, authorId, newReaction);
        return updatedReaction;
    } catch (error) {
        //toast(error.message, ToastTypes.ERROR);
        return false;
    }
}


export const deleteReaction = async (id: string): Promise<Reaction> => {
    const cookieHeader = await getCookie('Authentication', { cookies });
    try {
        const { data } = await shoppingApi.delete<ReactionDBResponse>(`/reactions/${id}`, {
            headers: {
                Cookie: `Authentication=${cookieHeader}`
            }
        });
        return ReactionMapper.fromDbCastToEntity(data);
    } catch (error) {
        throw CustomError.formatError(error);
    }
}
