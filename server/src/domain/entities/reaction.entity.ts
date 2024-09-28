import { CustomError } from "../errors/custom.error";

export class ReactionEntity {
    private constructor(
        public id: string,
        public reviewId: string,
        public reaction: string,
        public productId?: string,
        public authorId?: string,

    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, reviewId, authorId, reaction, productId } = object;

        if (!_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!productId) throw CustomError.badRequest('Missing Product Id');
        if (!reviewId) throw CustomError.badRequest('Missing Review Id');
        if (!authorId) throw CustomError.badRequest('Missing Author Id');
        if (!reaction) throw CustomError.badRequest('Missing Reaction');

        return new ReactionEntity(_id, reviewId, reaction, productId, authorId);
    }

    static reactionsToReviewIdObject(object: { [key: string]: any }) {
        const { _id, reviewId, authorId, reaction, productId } = object;

        if (!_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!productId) throw CustomError.badRequest('Missing Product Id');
        if (!reviewId) throw CustomError.badRequest('Missing Review Id');
        if (!authorId) throw CustomError.badRequest('Missing Author Id');
        if (!reaction) throw CustomError.badRequest('Missing Reaction');

        const key = reviewId.toString();

        return { [key]: new ReactionEntity(_id, reviewId, reaction) };
    }

    static reactionsCountToReviewIdObject(array: { [key: string]: any }[]) {
        const result: { [key: string]: any } = {};
        array.forEach(object => {
            const { total, reviewId, reaction } = object;
            const reviewIdKey = reviewId.toString();
            if (!(reviewIdKey in result)) {
                result[reviewIdKey] = {}
            }

            result[reviewIdKey][reaction] = total


        });

        return result;
    }
}