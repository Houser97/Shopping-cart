import { RatingModel } from "../../data/mongo/models/rating.model";
import { ReviewModel } from "../../data/mongo/models/review.model";
import { CreateRatingDto } from "../../domain/dtos/ratings/create-rating.dto";
import { RatingEntity } from "../../domain/entities/rating.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class RatingService {
    constructor() { }

    async create(createRatingDto: CreateRatingDto) {
        const { reviewId, authorId } = createRatingDto;

        const reviewExistsPromise = ReviewModel.findById(reviewId);
        const ratingExistsPromise = RatingModel.findOne({ authorId, reviewId: reviewId })

        const [
            reviewExists,
            ratingExists
        ] = await Promise.all([
            reviewExistsPromise,
            ratingExistsPromise
        ])

        if (!reviewExists) throw CustomError.badRequest('Review does not exist');
        if (ratingExists) throw CustomError.badRequest('User has already rated the product');

        try {
            const rating = new RatingModel(createRatingDto);

            await rating.save();
            const ratingEntity = RatingEntity.fromObject(rating);

            return ratingEntity
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}