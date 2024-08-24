import { ProductCart, ProductCartObject } from "../entities/product.cart";

export abstract class CartRepository {
    abstract getProducts(): Promise<ProductCartObject>;
    abstract createProduct(userId: string, productId: string, quantity: number): Promise<ProductCart>;
    abstract updateProduct(id: string, quantity: number): Promise<ProductCart>;
    abstract deleteProduct(id: string): Promise<ProductCart>;
    abstract handlePayment(): Promise<boolean>;
}