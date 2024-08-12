import { Validators } from "../../../../config/validators";

export class CreateProductCartDto {
    private constructor(
        public readonly userId: string,
        public readonly productId: string,
        public readonly quantity: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateProductCartDto?] {
        const { userId, productId, quantity } = props;
        const parsedQuantity = +quantity;

        if (!Validators.isMongoID(userId)) return ['Invalid User Id'];
        if (!Validators.isMongoID(productId)) return ['Invalid Product Id'];

        if (isNaN(parsedQuantity)) return ['Quantity must be a number'];
        if (parsedQuantity <= 0) return ['Quantity must be grater than 0'];

        return [undefined, new CreateProductCartDto(userId, productId, quantity)]
    }
}