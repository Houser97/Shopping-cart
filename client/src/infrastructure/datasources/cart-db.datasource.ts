import shoppingApi from "../../config/api/shoppingApi";
import { CartDatasource } from "../../domain/datasources/cart.datasource";
import { ProductCart, ProductCartObject } from "../../domain/entities/product.cart";
import { CustomError } from "../errors/custom.error";
import { ProductCartDBResponse } from "../interfaces/cart-db.response";
import { CartMapper } from "../mappers/cart.mapper";

export class CartDbDatasource extends CartDatasource {

    async getProducts(): Promise<ProductCartObject> {
        const { data } = await shoppingApi.get<ProductCartDBResponse[]>('/cart/products');
        return CartMapper.toProductCartObject(data);
    }

    async createProduct(userId: string, productId: string, quantity: number): Promise<ProductCart> {
        try {
            const { data } = await shoppingApi.post<ProductCartDBResponse>('/cart/products', {
                userId,
                productId,
                quantity
            });

            return CartMapper.toProductCart(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }

    async updateProduct(id: string, quantity: number): Promise<ProductCart> {
        try {
            const { data } = await shoppingApi.put(`/cart/products/${id}`, { quantity });
            return data;
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }

    async deleteProduct(id: string): Promise<ProductCart> {
        try {
            const { data } = await shoppingApi.delete<ProductCartDBResponse>(`/cart/products/${id}`);
            return CartMapper.toProductCart(data);
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }

    async handlePayment(): Promise<boolean> {
        try {
            const { data } = await shoppingApi.delete<boolean>('/cart/products');
            return data;
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
}