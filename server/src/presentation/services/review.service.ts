import { ReviewModel } from "../../data/mongo/models/review.model";
import { CreateReviewDto } from "../../domain/dtos/reviews/create-review.dto";
import { UpdateReviewDto } from "../../domain/dtos/reviews/update-review.dto";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ReviewService {
    constructor() { }

    async getReviews(productId: string, paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;

        try {
            const reviews = await ReviewModel.find({ item: productId })
                .sort({ date: -1 })
                .populate('author', 'username')
                .skip((page - 1) * limit)
                .limit(limit);

            return {
                page,
                limit,
                total: reviews.length,
                next: `/api/reviews/${productId}?page=${page + 1}&limit=${limit}`,
                prev: ((page - 1) > 0) ? `/api/reviews/${productId}?page=${page - 1}&limit=${limit}` : null,
                reviews
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async create(createReviewDto: CreateReviewDto) {
        try {
            const review = new ReviewModel(createReviewDto);

            await review.save();

            return review;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async update(updateReviewDto: UpdateReviewDto) {
        const { id, comment } = updateReviewDto;

        const updatedReview = await ReviewModel.findByIdAndUpdate(id, { comment });

        return updatedReview;
    }

    async delete() {
        throw 'Unimplemented method';
    }

    private async handleLike(reviewId: string, userId: string, action: 'like' | 'dislike') {
        try {
            const review = await ReviewModel.findById(reviewId);
            if (!review) throw CustomError.notFound('Review not found');

            let updateQuery;

            if (action === 'like') {
                updateQuery = {
                    $addToSet: { likes: userId },
                    $pull: { dislikes: userId }
                }
            } else {
                updateQuery = {
                    $addToSet: { dislikes: userId },
                    $pull: { likes: userId }
                }
            }

            const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, updateQuery);
            // TODO: do not return review's author.
            return review;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}