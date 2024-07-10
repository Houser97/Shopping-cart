import { Product } from "../entities/product";

export abstract class ProductDatasource {
    abstract getProducts(): Promise<Product[]>;
}