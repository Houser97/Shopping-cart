import { Validators } from "../../../config/validators";

export class CreateReviewDto {
    private constructor(
        public readonly productId: string,
        public readonly authorId: string,
        public readonly comment: string,
        public readonly rating: number,
    ) { };

    static create(props: { [key: string]: any }): [string?, CreateReviewDto?] {
        const {
            productId,
            authorId,
            comment,
            rating,
        } = props;

        const ratingParsed = +rating;

        if (!Validators.isMongoID(productId)) return ['Invalid Product ID'];
        if (!Validators.isMongoID(authorId)) return ['Invalid User ID'];
        if (!comment && comment.length < 5) return ['Comment must be greater than 5 characters'];

        if (isNaN(ratingParsed)) return ['Rating must be a number'];
        if (+ratingParsed < 0) return ['Rating must be greater or equal to 0'];
        if (+ratingParsed > 5) return ['Rating must be less or equal to 5'];

        return [undefined, new CreateReviewDto(
            productId,
            authorId,
            comment,
            rating
        )]
    }
}