import { Validators } from "../../../config/validators";

export class UpdateReviewDto {
    private constructor(
        public readonly id: string,
        public readonly authorId: string,
        public readonly rating?: number,
        public readonly comment?: string,
        public readonly like?: boolean,
        public readonly dislike?: boolean,
    ) { };

    static create(props: { [key: string]: any }): [string?, UpdateReviewDto?] {
        const {
            id,
            authorId,
            rating,
            comment,
            like,
            dislike,
        } = props;

        if (!id) return ['ProductId is empty'];
        if (!authorId) return ['AuthorId is empty'];
        if (!Validators.isMongoID(authorId)) return ['Invalid Author Id'];
        if (rating !== undefined && (rating < 0 || rating > 5))
            return ['Invalid rating'];
        if (comment !== undefined && (comment.length < 5)) return ['Comment is less than 6 characters'];
        if (like !== undefined && typeof like === 'boolean') return ['Invalid like'];
        if (dislike !== undefined && typeof dislike === 'boolean') return ['Invalid dislike'];
        // Should the authorId and userIdLike/userIdDislike be compared to ensure ther're equal?

        return [undefined, new UpdateReviewDto(
            id,
            authorId,
            rating,
            comment,
            like,
            dislike,
        )]
    }
}