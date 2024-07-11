import { ProductDbDatasource } from "../../infrastructure/datasources/products-db.datasource";
import { ProductRepositoryImpl } from "../../infrastructure/repositories/product-db.repository.impl";

export const productRepositoryProvider = new ProductRepositoryImpl(new ProductDbDatasource);