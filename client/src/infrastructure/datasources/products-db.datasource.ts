import shoppingApi from "../../config/api/shoppingApi";
import { ProductDatasource } from "../../domain/datasources/products.datasource";
import { Product } from "../../domain/entities/product";
import { CustomError } from "../errors/custom.error";
import { ProductDBResponse } from "../interfaces/product-db.response";
import { ProductMapper } from "../mappers/product.mapper";

export class ProductDbDatasource extends ProductDatasource {

    async getProducts(): Promise<Product[]> {
        try {
            const { data } = await shoppingApi.get<ProductDBResponse[]>('/products');
            const products = data.map(ProductMapper.fromDbCastToEntity);
            return products;
        } catch (error) {
            throw CustomError.formatError(error);
        }

    }

    async getProductById(id: string): Promise<Product> {
        try {
            const { data } = await shoppingApi.get(`/products/${id}`);
            const product = ProductMapper.fromDbCastToEntity(data);
            return product;
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
}