import { reactionRepositoryProvider } from "@/providers/reaction-repository.provider";

export const getReactions = async (productId: string) => {
    try {
        const reactions = await reactionRepositoryProvider.getReactions(productId);
        return reactions;
    } catch (error) {
        //toast(error.message, ToastTypes.ERROR);
        return {};
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

