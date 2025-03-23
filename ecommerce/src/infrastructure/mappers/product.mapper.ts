import { Product } from "../../domain/entities/product";
import { ProductDBResponse } from "../interfaces/product-db.response";

export class ProductMapper {
    static fromDbCastToEntity(product: ProductDBResponse): Product {
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            authorId: product.authorId,
            images: product.images,
            description: product.description,
            rating: product.rating,
            totalReviews: product.totalReviews,
            slug: product.slug
        }
    }
}