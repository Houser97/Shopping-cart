import { Validators } from "../../../config/validators";

export class CreateProductDto {
    private constructor(
        public readonly title: string,
        public readonly images: any[],
        public readonly price: number,
        public readonly authorId: string,
        public readonly description?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
        const { title, images, price, authorId, description } = props;
        const parsedPrice = +price;

        if (!Validators.isMongoID(authorId)) return ['Invalid Author Id'];

        if (!title) return ['Missing title'];

        if (!images) return ['Missing images'];
        if (!Array.isArray(images)) return ['Images must be in an array'];
        if (images.length === 0) return ['There must be at least one image'];

        if (!price) return ['Missing price'];
        if (isNaN(parsedPrice)) return ['Price must be a number'];
        if (parsedPrice <= 0) return ['Price must be grater than 0'];
        if (parsedPrice > 1000000) return ['Price must be less or equal to 1000000'];

        if (description !== undefined && description.length < 5) return ['Description must have at least 5 characters'];


        return [undefined, new CreateProductDto(title, images, price, authorId, description)]
    }
}