import { ReviewMapper } from "@/infrastructure/mappers/review.mapper";
import { reviewRepositoryProvider } from "@/providers/review-repository.provider";

export const createReview = async (userId: string, comment: string, rating: number, productId: string) => {
    try {
        return await reviewRepositoryProvider.createReview(userId, comment, rating, productId);
    } catch (error) {
        //toast(error.message, ToastTypes.ERROR);
        return ReviewMapper.emptyReview();
    }
}

export const updateReview = async (id: string, userId: string, comment: string, rating: number) => {
    try {
        return await reviewRepositoryProvider.updateReview(id, userId, comment, rating);
    } catch (error) {
        //toast(error.message, ToastTypes.ERROR);
        return ReviewMapper.emptyReview();
    }
}

export const deleteReview = async (id: string) => {
    try {
        return await reviewRepositoryProvider.deleteReview(id);
    } catch (error) {
        //toast(error.message, ToastTypes.ERROR);
        console.log(error)
        return ReviewMapper.emptyReview();
    }
}


