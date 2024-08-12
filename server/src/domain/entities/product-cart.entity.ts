import { CustomError } from "../errors/custom.error";

export class ProductCartEntity {
    constructor(
        public id: string,
        public userId: string,
        public productId: string,
        public quantity: number,
        public price: number,
        public image: string,
        public name: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, userId, productId: product, quantity } = object;
        const { price, title, images, _id: productId } = product;

        if (!_id) throw CustomError.badRequest('Missing id');
        if (!userId) throw CustomError.badRequest('Missing user id');
        if (!product) throw CustomError.badRequest('Missing product');
        if (!quantity) throw CustomError.badRequest('Missing quantity');
        if (!title) throw CustomError.badRequest('Missing title');
        if (!Array.isArray(images)) throw CustomError.badRequest('Missing image');
        if (!price) throw CustomError.badRequest('Missing price');

        return new ProductCartEntity(_id.toString(), userId.toString(), productId.toString(), +quantity, +price, images[0], title);
    }
}