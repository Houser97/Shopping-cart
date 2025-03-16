import { ReactionDbDatasource } from "@/infrastructure/datasources/reactions-db.datasource";
import { ReactionRepositoryImpl } from "@/infrastructure/repositories/reaction-db.repository.impl";

export const reactionRepositoryProvider = new ReactionRepositoryImpl(new ReactionDbDatasource);