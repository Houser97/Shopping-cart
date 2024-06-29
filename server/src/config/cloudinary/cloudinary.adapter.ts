import { CustomError } from "../../domain/errors/custom.error";
import { envs } from "../envs";
import { cloudinary } from "./cloudinary.config";

export class Cloudinary {
    static async uploadImage(image: string) {
        try {
            const data = await cloudinary.uploader.upload(image, {
                upload_preset: envs.CLOUDINARY_PRESET
            });
            return data;
        } catch (error) {
            CustomError.internalServer(`${error}`);
        }
    }
}