import { Validators } from "../../../../config/validators";

export class UpdateProductCartDto {
    private constructor(
        public readonly quantity: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, UpdateProductCartDto?] {
        const { quantity } = props;
        const parsedQuantity = +quantity;

        if (isNaN(parsedQuantity)) return ['Quantity must be a number'];
        if (parsedQuantity <= 0) return ['Quantity must be grater than 0'];

        return [undefined, new UpdateProductCartDto(parsedQuantity)];
    }
}