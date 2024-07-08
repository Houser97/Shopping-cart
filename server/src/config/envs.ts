import 'dotenv/config';
import { get } from "env-var";


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    CLOUD_NAME: get('CLOUD_NAME').required().asString(),
    API_KEY_CLOUDINARY: get('API_KEY_CLOUDINARY').required().asString(),
    API_SECRET_CLOUDINARY: get('API_SECRET_CLOUDINARY').required().asString(),
    CLOUDINARY_PRESET: get('CLOUDINARY_PRESET').required().asString(),
}