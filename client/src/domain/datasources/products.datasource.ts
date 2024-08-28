import { Product } from "../entities/product";

export abstract class ProductDatasource {
    abstract getProducts(): Promise<Product[]>;
    abstract getProductById(id: string): Promise<Product>;
}