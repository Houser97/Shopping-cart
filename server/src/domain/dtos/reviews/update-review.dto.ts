import { Validators } from "../../../config/validators";

export class UpdateReviewDto {
    private constructor(
        public readonly authorId: string,
        public readonly comment: string,
    ) { };

    static create(props: { [key: string]: any }): [string?, UpdateReviewDto?] {
        const {
            authorId,
            comment,
        } = props;

        if (!authorId) return ['AuthorId is empty'];
        if (!Validators.isMongoID(authorId)) return ['Invalid Author Id'];

        if (comment !== undefined && (comment.length < 5)) return ['Comment is less than 6 characters'];

        return [undefined, new UpdateReviewDto(
            authorId,
            comment
        )]
    }
}