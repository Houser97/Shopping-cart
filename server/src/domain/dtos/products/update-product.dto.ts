import { Validators } from "../../../config/validators";

export class UpdateProductDto {
    private constructor(
        public readonly id: string,
        public readonly title?: string,
        public readonly images?: string[],
        public readonly price?: number,
        public readonly authorId?: string,
        public readonly description?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, UpdateProductDto?] {
        const { id, title, images, price, authorId, description } = props;
        const parsedPrice = price !== undefined ? +price : undefined;

        if (!Validators.isMongoID(id)) return ['Invalid Product Id'];

        if (authorId !== undefined && !Validators.isMongoID(authorId)) return ['Invalid Author Id'];

        if (title !== undefined && title.trim() === '') return ['Title cannot be empty'];

        if (images !== undefined) {
            if (!Array.isArray(images)) return ['Images must be in an array'];
            if (images.length === 0) return ['There must be at least one image'];
        }

        if (price !== undefined) {
            if (isNaN(parsedPrice!)) return ['Price must be a number'];
            if (parsedPrice! <= 0) return ['Price must be greater than 0'];
            if (parsedPrice! > 1000000) return ['Price must be less or equal to 1000000'];
        }

        if (description !== undefined && description.length < 5) return ['Description must have at least 5 characters'];

        return [undefined, new UpdateProductDto(id, title, images, parsedPrice, authorId, description)]
    }
}
