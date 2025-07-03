import { DetailedReview, Review } from "../../domain/entities/review";
import { ReviewDB } from "../interfaces/review-db.response";

export class ReviewMapper {
    static fromDbCastToDetailedReview(review: ReviewDB): DetailedReview {
        return {
            id: review._id,
            productId: review.productId,
            authorId: review.authorId,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            reactions: review.reactions,
            author: { ...review.author, id: review._id },
        }
    }

    static fromDbCastToReview(review: any): Review {
        return {
            id: review.id,
            productId: review.productId,
            authorId: review.authorId,
            rating: review.rating,
            comment: review.comment,
        }
    }

    static emptyReview(): Review {
        return {
            id: '',
            productId: '',
            authorId: '',
            rating: 0,
            comment: '',
        }
    }
}