import { CustomError } from "../errors/custom.error";

export class ProductCartEntity {
    constructor(
        public id: string,
        public userId: string,
        public productId: string,
        public quantity: string,
        public price: number,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, userId, productId, quantity, price } = object;


        if (!_id) throw CustomError.badRequest('Missing id');
        if (!userId) throw CustomError.badRequest('Missing title');
        if (!productId) throw CustomError.badRequest('Missing product id');
        if (!quantity) throw CustomError.badRequest('Missing quantity');
        if (!price) throw CustomError.badRequest('Price quantity');

        return new ProductCartEntity(_id, userId, productId, quantity, price);
    }
}