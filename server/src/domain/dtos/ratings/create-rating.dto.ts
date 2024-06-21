import { Validators } from "../../../config/validators";

export class CreateRatingDto {
    private constructor(
        public readonly reviewId: string,
        public readonly authorId: string,
        public readonly productId: string,
        public readonly rating: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateRatingDto?] {
        const {
            reviewId,
            authorId,
            productId,
            rating
        } = props

        const ratingParsed = +rating;

        if (!Validators.isMongoID(authorId)) return ['Invalid User ID'];
        if (!Validators.isMongoID(reviewId)) return ['Invalid Review ID'];
        if (!Validators.isMongoID(productId)) return ['Invalid Product ID'];
        if (isNaN(ratingParsed)) return ['Rating must be a number'];
        if (+ratingParsed < 0) return ['Rating must be greater or equal to 0'];
        if (+ratingParsed > 5) return ['Rating must be less or equal to 5'];

        return [undefined, new CreateRatingDto(reviewId, authorId, productId, rating)];
    }
}