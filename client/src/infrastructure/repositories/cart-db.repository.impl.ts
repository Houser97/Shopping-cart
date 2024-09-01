import { CartDatasource } from "../../domain/datasources/cart.datasource";
import { ProductCartObject, ProductCart } from "../../domain/entities/product.cart";
import { CartRepository } from "../../domain/repositories/cart.repository";

export class CartResporityImpl extends CartRepository {

    constructor(
        private datasource: CartDatasource,
    ) {
        super();
    }

    getProducts(): Promise<ProductCartObject> {
        return this.datasource.getProducts();
    }
    async createProduct(userId: string, productId: string, quantity: number): Promise<ProductCart> {
        return this.datasource.createProduct(userId, productId, quantity);
    }
    updateProduct(id: string, quantity: number): Promise<ProductCart> {
        return this.datasource.updateProduct(id, quantity);
    }
    deleteProduct(id: string): Promise<ProductCart> {
        return this.datasource.deleteProduct(id);
    }
    handlePayment(): Promise<boolean> {
        return this.datasource.handlePayment();
    }

}