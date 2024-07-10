import { ProductDatasource } from "../../domain/datasources/products.datasource";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/products.repository";

export class ProductRepositoryImpl extends ProductRepository {

    constructor(
        private datasource: ProductDatasource
    ) {
        super()
    }

    async getProducts(): Promise<Product[]> {
        return this.datasource.getProducts();
    }
}