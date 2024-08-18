import { useState } from "react";
import { reviewRepositoryProvider } from "../providers";
import { toast } from "sonner";
import { Review } from "../../domain/entities/review";
import { ReviewMapper } from "../../infrastructure/mappers/review.mapper";


export const useReview = () => {

    const [review, setReview] = useState<Review | null>(null);

    const getReviewByProductIdAndUserId = async (productId: string) => {
        try {
            const review = await reviewRepositoryProvider.getReviewByProductIdAndUserId(productId);
            setReview(review);
            return review;
        } catch (error) {
            toast.error(error.message);
            return ReviewMapper.emptyReview();
        }
    }

    const createReview = async (userId, comment, rating, productId) => {
        try {
            const review = await reviewRepositoryProvider.createReview(userId, comment, rating, productId);
            setReview(review);
            return review;
        } catch (error) {
            toast.error(error.message);
            return ReviewMapper.emptyReview();
        }
    }

    const updateReview = async (id, userId, comment, rating) => {
        try {
            const review = await reviewRepositoryProvider.updateReview(id, userId, comment, rating);
            setReview(review);
            return review;
        } catch (error) {
            toast.error(error.message);
            return ReviewMapper.emptyReview();
        }
    }

    const deleteReview = async (id) => {
        try {
            const review = await reviewRepositoryProvider.deleteReview(id);
            setReview(review);
            return review;
        } catch (error) {
            toast.error(error.message);
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