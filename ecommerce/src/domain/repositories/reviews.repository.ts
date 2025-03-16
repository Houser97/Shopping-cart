import { GetReviewsType } from "../datasources/reviews.datasource";
import { Review } from "../entities/review";

export abstract class ReviewRepository {
    abstract getReviews(productId: string): Promise<GetReviewsType>;
    abstract getReviewByProductIdAndUserId(productId: string): Promise<Review>;
    abstract createReview(userId: string, comment: string, rating: number, productId: string): Promise<Review>;
    abstract updateReview(id: string, userId: string, comment: string, rating: number): Promise<Review>;
    abstract deleteReview(id: string): Promise<Review>;
}