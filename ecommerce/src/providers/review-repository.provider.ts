import { ReviewDbDatasource } from "@/infrastructure/datasources/reviews-db.datasource";
import { ReviewRepositoryImpl } from "@/infrastructure/repositories/review-db.repository.impl";

export const reviewRepositoryProvider = new ReviewRepositoryImpl(new ReviewDbDatasource);