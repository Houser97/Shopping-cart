import { Product } from "../../domain/entities/product";
import { ProductDB } from "../interfaces/product-db.response";

export class ProductMapper {
    static fromDbCastToEntity(product: ProductDB): Product {
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            authorId: product.authorId,
            images: product.images,
            description: product.description,
            rating: product.rating,
            totalReviews: product.totalReviews
        }
    }
}
