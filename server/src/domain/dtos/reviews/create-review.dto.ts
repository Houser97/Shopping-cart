import { Validators } from "../../../config/validators";

export class CreateReviewDto {
    private constructor(
        public readonly productId: string,
        public readonly authorId: string,
        public readonly comment: string,
    ) { };

    static create(props: { [key: string]: any }): [string?, CreateReviewDto?] {
        const {
            productId,
            authorId,
            comment,
        } = props;

        if (!Validators.isMongoID(productId)) return ['Invalid Product ID'];
        if (!Validators.isMongoID(authorId)) return ['Invalid User ID'];
        if (!comment && comment.length < 5) return ['Comment must be greater than 5 characters'];

        return [undefined, new CreateReviewDto(
            productId,
            authorId,
            comment,
        )]
    }
}