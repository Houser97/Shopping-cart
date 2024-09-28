import { Validators } from "../../../config/validators";

export class UpdateReviewDto {
    private constructor(
        public readonly authorId: string,
        public readonly comment: string,
        public readonly rating: number,
    ) { };

    static create(props: { [key: string]: any }): [string?, UpdateReviewDto?] {
        const {
            authorId,
            comment,
            rating
        } = props;

        if (!authorId) return ['AuthorId is empty'];
        if (!Validators.isMongoID(authorId)) return ['Invalid Author Id'];

        if (comment !== undefined && (comment.length < 5)) return ['Comment is less than 6 characters'];
        if (!rating) return ['Rating is missing'];

        return [undefined, new UpdateReviewDto(
            authorId,
            comment,
            rating
        )]
    }
}