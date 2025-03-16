import shoppingApi from "../../config/api/shoppingApi";
import { ProductDatasource } from "../../domain/datasources/products.datasource";
import { Product } from "../../domain/entities/product";
import { CustomError } from "../errors/custom.error";
import { ProductDBResponseNest } from "../interfaces/product-db.response";
import { ProductMapper } from "../mappers/product.mapper";

export class ProductDbDatasource extends ProductDatasource {

    async getProducts(): Promise<Product[]> {
        try {
            const { data } = await shoppingApi.get<ProductDBResponseNest>('/products');
            const productsDb = data.data;
            const products = productsDb.map(ProductMapper.fromDbCastToEntity);
            return products;
        } catch (error) {
            throw CustomError.formatError(error);
        }

    }

    async getProductById(id: string): Promise<Product> {
        try {
            const { data } = await shoppingApi.get(`/products/${id}`);
            const productDb = data.data;
            const product = ProductMapper.fromDbCastToEntity(productDb);
            return product;
        } catch (error) {
            throw CustomError.formatError(error);
        }
    }
}