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