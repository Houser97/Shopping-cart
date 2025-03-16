import { TotalReactions } from "../entities/reaction";
import { DetailedReview, Review } from "../entities/review";

export interface GetReviewsType {
    reviews: DetailedReview[];
    totalReactions: TotalReactions;
}

export abstract class ReviewDatasource {
    abstract getReviews(productId: string): Promise<GetReviewsType>;
    abstract getReviewByProductIdAndUserId(productId: string): Promise<Review>;
    abstract createReview(userId: string, comment: string, rating: number, productId: string): Promise<Review>;
    abstract updateReview(id: string, userId: string, comment: string, rating: number): Promise<Review>;
    abstract deleteReview(id: string): Promise<Review>;
}