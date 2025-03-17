import shoppingApi from "@/config/api/shoppingApiAxios";
import { GetReviewsType, ReviewDatasource } from "../../domain/datasources/reviews.datasource";

import { Review } from "../../domain/entities/review";
import { CustomError } from "../errors/custom.error";

import { ReviewDBResponseNest } from "../interfaces/review-db.response";

import { ReviewMapper } from "../mappers/review.mapper";

export class ReviewDbDatasource extends ReviewDatasource {

    async getReviews(productId: string): Promise<GetReviewsType> {
        const { data } = await shoppingApi.get<ReviewDBResponseNest>(`/reviews/product/${productId}`);
        const reviewsDb = data.data;

        const reviews = reviewsDb.map(ReviewMapper.fromDbCastToDetailedReview);
        const totalReactions = {}

        return { reviews, totalReactions };
    }

    async getReviewByProductIdAndUserId(productId: string): Promise<Review> {
        try {
            const { data } = await shoppingApi.get(`/reviews/${productId}`);
            const review = data.data;
            if (!review) return ReviewMapper.emptyReview();
            return ReviewMapper.fromDbCastToReview(review);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
    async createReview(userId: string, comment: string, rating: number, productId: string): Promise<Review> {
        try {
            const { data } = await shoppingApi.post(`/reviews`, {
                productId,
                authorId: userId,
                comment,
                rating
            });
            if (!data) return ReviewMapper.emptyReview();
            return ReviewMapper.fromDbCastToReview(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
    async updateReview(id: string, userId: string, comment: string, rating: number): Promise<Review> {
        try {
            const { data } = await shoppingApi.patch(`/reviews/${id}`, {
                authorId: userId,
                comment,
                rating,
            });
            if (!data) return ReviewMapper.emptyReview();
            return ReviewMapper.fromDbCastToReview(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
    async deleteReview(id: string): Promise<Review> {
        try {
            const { data } = await shoppingApi.delete(`/reviews/${id}`);
            if (!data) return ReviewMapper.emptyReview();
            return ReviewMapper.fromDbCastToReview(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }

}