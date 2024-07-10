import { Product } from "../entities/product";

export abstract class ProductRepository {
    abstract getProducts(): Promise<Product[]>;
}