import { v2 as cloudinary } from "cloudinary";
import { envs } from "../envs";

cloudinary.config({
    cloud_name: envs.CLOUD_NAME,
    api_key: envs.API_KEY_CLOUDINARY,
    api_secret: envs.API_SECRET_CLOUDINARY
});

export { cloudinary };