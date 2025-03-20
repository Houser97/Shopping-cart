import { CartDbDatasource } from "@/infrastructure/datasources/cart-db.datasource";
import { CartResporityImpl } from "@/infrastructure/repositories/cart-db.repository.impl";

export const cartRepositoryProvider = new CartResporityImpl(new CartDbDatasource());