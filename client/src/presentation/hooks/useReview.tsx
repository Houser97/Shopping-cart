import { useState } from "react";
import { reviewRepositoryProvider } from "../providers";
import { Review } from "../../domain/entities/review";
import { ReviewMapper } from "../../infrastructure/mappers/review.mapper";
import { ToastTypes, toast } from "../../config/helpers/Toaster/Toaster";


export const useReview = () => {

    const [review, setReview] = useState<Review | null>(null);

    const getReviewByProductIdAndUserId = async (productId: string) => {
        try {
            const review = await reviewRepositoryProvider.getReviewByProductIdAndUserId(productId);
            setReview(review);
            return review;
        } catch (error) {
            toast(error.message, ToastTypes.ERROR);
            return ReviewMapper.emptyReview();
        }
    }

    const createReview = async (userId, comment, rating, productId) => {
        try {
            const review = await reviewRepositoryProvider.createReview(userId, comment, rating, productId);
            setReview(review);
            return review;
        } catch (error) {
            toast(error.message, ToastTypes.ERROR);
            return ReviewMapper.emptyReview();
        }
    }

    const updateReview = async (id: string, userId: string, comment: string, rating: number) => {
        try {
            const review = await reviewRepositoryProvider.updateReview(id, userId, comment, rating);
            setReview(review);
            return review;
        } catch (error) {
            toast(error.message, ToastTypes.ERROR);
            return ReviewMapper.emptyReview();
        }
    }

    const deleteReview = async (id: string) => {
        try {
            const review = await reviewRepositoryProvider.deleteReview(id);
            setReview(review);
            return review;
        } catch (error) {
            toast(error.message, ToastTypes.ERROR);
            return ReviewMapper.emptyReview();
        }
    }


    return {
        review,
        getReviewByProductIdAndUserId,
        createReview,
        updateReview,
        deleteReview
    };
}