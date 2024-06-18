import { CustomError } from "../errors/custom.error";

export class RatingEntity {
    constructor(
        public id: string,
        public reviewId: string,
        public authorId: string,
        public rating: number
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, reviewId, authorId, rating } = object;

        if (!_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!reviewId) throw CustomError.badRequest('Missing Review Id');
        if (!authorId) throw CustomError.badRequest('Missing Author Id');
        if (!rating) throw CustomError.badRequest('Missing Rating');

        return new RatingEntity(_id, reviewId, authorId, rating);
    }
}