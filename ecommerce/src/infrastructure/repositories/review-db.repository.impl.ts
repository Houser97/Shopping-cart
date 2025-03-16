import { GetReviewsType, ReviewDatasource } from "../../domain/datasources/reviews.datasource";
import { Review } from "../../domain/entities/review";
import { ReviewRepository } from "../../domain/repositories/reviews.repository";

export class ReviewRepositoryImpl extends ReviewRepository {

    constructor(
        private datasource: ReviewDatasource
    ) {
        super()
    }

    async getReviews(productId: string): Promise<GetReviewsType> {
        return this.datasource.getReviews(productId);
    }

    async getReviewByProductIdAndUserId(productId: string): Promise<Review> {
        return this.datasource.getReviewByProductIdAndUserId(productId);
    }
    async createReview(userId: string, comment: string, rating: number, productId: string): Promise<Review> {
        return this.datasource.createReview(userId, comment, rating, productId);
    }
    async updateReview(id: string, userId: string, comment: string, rating: number): Promise<Review> {
        return this.datasource.updateReview(id, userId, comment, rating);
    }
    async deleteReview(id: string): Promise<Review> {
        return this.datasource.deleteReview(id);
    }
}