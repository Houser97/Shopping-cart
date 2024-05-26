import { Validators } from "../../../config/validators";

export class CreateReviewDto {
    private constructor(
        public readonly author: string,
        public readonly item: number,
        public readonly rating: number,
        public readonly comment: string,
        public readonly likes: string[] = [],
        public readonly dislikes: string[] = [],
    ) { };

    static create(props: { [key: string]: any }): [string?, CreateReviewDto?] {
        const {
            author,
            item,
            rating,
            comment,
        } = props;

        if (!comment) return ['Comment must not be empty'];
        if (!Validators.isMongoID(author)) return ['Invalid User ID'];

        return [undefined, new CreateReviewDto(
            author,
            item,
            rating,
            comment,
        )]
    }
}