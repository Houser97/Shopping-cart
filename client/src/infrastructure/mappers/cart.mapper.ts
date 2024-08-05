import { ProductCart } from "../../domain/entities/product.cart";
import { Product } from "../../domain/entities/product";

export class CartMapper {
    static toProductCart(product: Product, quantity: number): ProductCart {
        return {
            id: product.id,
            price: product.price,
            image: product.images[0],
            name: product.title,
            quantity
        }
    }
}