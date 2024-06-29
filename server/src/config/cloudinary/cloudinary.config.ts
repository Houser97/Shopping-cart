import { v2 } from "cloudinary";
import { envs } from "../envs";

export const cloudinary = v2.config({
    cloud_name: envs.CLOUD_NAME,
    api_key: envs.API_KEY_CLOUDINARY,
    api_secret: envs.API_SECRET_CLOUDINARY
});