import { CustomError } from "../errors/custom.error";

export class ReviewEntity {
    private constructor(
        public id: string,
        public authorId: string,
        public productId: string,
        public rating: number,
        public comment: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, authorId, productId, comment, rating } = object;

        if (!_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!productId) throw CustomError.badRequest('Missing Product Id');
        if (!comment) throw CustomError.badRequest('Missing comment');
        if (!authorId) throw CustomError.badRequest('Missing Author Id');
        if (!rating) throw CustomError.badRequest('Missing rating');

        return new ReviewEntity(_id, authorId, productId, rating, comment);
    }
}