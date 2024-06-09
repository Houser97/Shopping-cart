import { envs } from "./config/envs";
import { Passport } from "./config/passport";
import { MongoDatabase } from "./data/mongo/mongo-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { AuthService } from "./presentation/services/auth.service";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    passport: new Passport('email'),
  });

  server.start();
}