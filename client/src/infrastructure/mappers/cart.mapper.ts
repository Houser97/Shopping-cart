import { Product } from "../../domain/entities/product";
import { ProductCart, ProductCartObject } from "../../domain/entities/product.cart";
import { ProductCartDBResponse } from "../interfaces/cart-db.response";

export class CartMapper {
    static toProductCart(product: ProductCartDBResponse): ProductCart {
        return {
            id: product.id,
            userId: product.userId,
            productId: product.productId,
            price: +product.price,
            image: product.image,
            name: product.name,
            quantity: +product.quantity
        }
    }

    static toProductCartObject(products: ProductCartDBResponse[]): ProductCartObject {
        return products.reduce((prev, product) => {
            const { productId } = product;
            const key = productId.toString();

            return { ...prev, [key]: product };
        }, {});
    }

    static productToProductCart(product: Product, quantity: number, userId: string): ProductCart {
        return {
            id: '',
            userId: userId,
            productId: product.id,
            price: product.price,
            image: product.images[0],
            name: product.title,
            quantity: quantity
        }
    }
}