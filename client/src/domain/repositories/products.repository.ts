import { Product } from "../entities/product";

export abstract class ProductRepository {
    abstract getProducts(): Promise<Product[]>;
    abstract getProductById(id: string): Promise<Product>;
}