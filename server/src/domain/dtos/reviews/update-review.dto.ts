import { Validators } from "../../../config/validators";

export class UpdateReviewDto {
    private constructor(
        public readonly id: string,
        public readonly authorId: string,
        public readonly comment: string,
    ) { };

    static create(props: { [key: string]: any }): [string?, UpdateReviewDto?] {
        const {
            id,
            authorId,
            comment,
        } = props;

        if (!id) return ['ProductId is empty'];
        if (!Validators.isMongoID(id)) return ['Invalid Review Id'];

        if (!authorId) return ['AuthorId is empty'];
        if (!Validators.isMongoID(authorId)) return ['Invalid Author Id'];

        if (comment !== undefined && (comment.length < 5)) return ['Comment is less than 6 characters'];

        return [undefined, new UpdateReviewDto(
            id,
            authorId,
            comment
        )]
    }
}