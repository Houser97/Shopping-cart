import { useState } from "react";
import { reactionRepositoryProvider } from "../providers";
import { Reaction, ReactionsReviewIdObject } from "../../domain/entities/reaction";
import { ToastTypes, toast } from "../../config/helpers/Toaster/Toaster";


export const useReaction = (reactionEntity: Reaction | undefined = undefined) => {

    const [reaction, setReaction] = useState<Reaction | undefined>(reactionEntity);
    const [reactions, setReactions] = useState<ReactionsReviewIdObject>({});

    const getReactions = async (productId: string) => {
        try {
            const reactions = await reactionRepositoryProvider.getReactions(productId);
            setReactions(reactions);
            return true;
        } catch (error) {
            toast(error.message, ToastTypes.ERROR);
            return false;
        }
    }

    const createReaction = async (productId: string, reviewId: string, authorId: string, reaction: string) => {
        try {
            const createdReaction = await reactionRepositoryProvider.createReaction(productId, reviewId, authorId, reaction);
            setReaction(createdReaction);
            return true;
        } catch (error) {
            if (error.status === 401) {
                toast('Login to make this operation', ToastTypes.ERROR);
            } else {
                toast(error.message, ToastTypes.ERROR);
            }
            return false;
        }
    }

    const updateReaction = async (id: string, reviewId: string, authorId: string, newReaction: string) => {
        try {
            const updatedReaction = await reactionRepositoryProvider.updateReaction(id, reviewId, authorId, newReaction);
            setReaction(prev => ({ ...updatedReaction, id: prev.id }));
            return true;
        } catch (error) {
            toast(error.message, ToastTypes.ERROR);
            return false;
        }
    }

    return {
        reaction,
        reactions,
        getReactions,
        createReaction,
        updateReaction
    };
}