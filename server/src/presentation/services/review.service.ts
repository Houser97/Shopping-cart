import mongoose from "mongoose";
import { ProductModel } from "../../data/mongo/models/product.model";
import { ReviewModel } from "../../data/mongo/models/review.model";
import { CreateReviewDto } from "../../domain/dtos/reviews/create-review.dto";
import { UpdateReviewDto } from "../../domain/dtos/reviews/update-review.dto";
import { PaginationDto } from "../../domain/dtos/shared/pagination.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { ReactionService } from "./reaction.service";

export class ReviewService {
    constructor(
        private reactionService: ReactionService
    ) { }

    async getReviews(productId: string, paginationDto: PaginationDto, authorId: string) {
        const { page, limit } = paginationDto;

        try {
            const totalReviewsPromise = ReviewModel.countDocuments({ productId });

            const reviewsPromise = ReviewModel.aggregate([
                { $match: { productId: new mongoose.Types.ObjectId(productId) } },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                { $lookup: { from: "ratings", localField: "_id", foreignField: "reviewId", as: "ratings" } },
                { $lookup: { from: "reactions", localField: "_id", foreignField: "reviewId", as: "reactions" } },
                { $lookup: { from: "users", localField: "authorId", foreignField: "_id", as: "author" } },
                { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        "author.password": 0,
                        "author.email": 0,
                        "author.cart": 0,
                        "__v": 0,
                        "author.__v": 0,
                    }
                }
            ]);

            const reactionsPromise = this.reactionService.get(productId, authorId);

            const [totalReviews, reviews, reactions] = await Promise.all([totalReviewsPromise, reviewsPromise, reactionsPromise])

            const reviewsId = reviews.reduce((prev, current) => {
                return [...prev, current._id];
            }, []);

            const totalReactions = await this.reactionService.getTotalReactions(reviewsId);

            return {
                page,
                limit,
                total: totalReviews,
                totalPages: Math.ceil(totalReviews / limit),
                next: (page * limit < totalReviews) ? `/api/reviews/${productId}?page=${page + 1}&limit=${limit}` : null,
                prev: (page > 1) ? `/api/reviews/${productId}?page=${page - 1}&limit=${limit}` : null,
                reviews: reviews,
                userReactions: reactions,
                totalReactions: totalReactions
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async create(createReviewDto: CreateReviewDto) {
        const { productId, authorId } = createReviewDto;

        const productExistsPromise = ProductModel.findById(productId);
        const reviewExistsPromise = ReviewModel.findOne({ authorId, productId })

        const [
            productExists,
            reviewExists
        ] = await Promise.all([
            productExistsPromise,
            reviewExistsPromise
        ])


        if (!productExists) throw CustomError.badRequest('Product does not exists');
        if (reviewExists) throw CustomError.badRequest('User has already reviewed the product');

        try {
            const review = new ReviewModel(createReviewDto);

            await review.save();

            return review;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async update(id: string, updateReviewDto: UpdateReviewDto) {
        const { comment } = updateReviewDto;

        try {
            const updatedReview = await ReviewModel.findByIdAndUpdate(id, { comment });

            return updatedReview;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async delete(id: string) {

        try {
            const review = await ReviewModel.findByIdAndDelete(id);
            return review;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }
}