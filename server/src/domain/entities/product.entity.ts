import { CustomError } from "../errors/custom.error";

export class ProductEntity {
    constructor(
        public id: string,
        public title: string,
        public price: number,
        public authorId: string,
        public images: string[],
        public description: string,
        public rating?: number,
        public totalReviews?: number,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, title, price, authorId, images, description, rating, totalReviews } = object;


        if (!_id) throw CustomError.badRequest('Missing id');
        if (!title) throw CustomError.badRequest('Missing title');
        if (!price) throw CustomError.badRequest('Missing price');
        if (!images) throw CustomError.badRequest('Missing images');
        if (!description) throw CustomError.badRequest('Missing description');
        if (!authorId) throw CustomError.badRequest('Missing Author Id');
        if (rating && isNaN(rating)) throw CustomError.badRequest('Rating must be a number');
        if (totalReviews && isNaN(totalReviews)) throw CustomError.badRequest('Total Reviews must be a number');

        return new ProductEntity(_id, title, price, authorId, images, description, rating, totalReviews);
    }
}