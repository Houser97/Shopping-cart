import shoppingApi from "../../config/api/shoppingApi";
import { ProductDatasource } from "../../domain/datasources/products.datasource";
import { Product } from "../../domain/entities/product";
import { ProductMapper } from "../mappers/product.mapper";

export class ProductDbDatasource extends ProductDatasource {
    async getProducts(): Promise<Product[]> {
        const { data } = await shoppingApi.get('/products');
        const productsResponse = data.map(ProductMapper.fromDbCastToEntity);
        return productsResponse;
    }
}