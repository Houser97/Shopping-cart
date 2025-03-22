'use server'
import shoppingApi from "@/config/api/shoppingApiAxios";
import { ReviewMapper } from "@/infrastructure/mappers/review.mapper";
import { reviewRepositoryProvider } from "@/providers/review-repository.provider";
import { getCookie } from "cookies-next";
import { cookies } from 'next/headers';

export const getReviewByProductIdAndUserId = async (productId: string) => {
    const cookieHeader = await getCookie('Authentication', { cookies })

    try {
        const { data } = await shoppingApi.get(`/reviews/${productId}`, {
            headers: {
                Cookie: `Authentication=${cookieHeader}`
            }
        });
        const review = data.data;
        if (!review) return ReviewMapper.emptyReview();
        return ReviewMapper.fromDbCastToReview(review);
        return await reviewRepositoryProvider.getReviewByProductIdAndUserId(productId);
    } catch (error) {
        //toast(error.message, ToastTypes.ERROR);
        return ReviewMapper.emptyReview();
    }
}

