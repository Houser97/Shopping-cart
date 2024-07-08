import { UploadedFile } from "express-fileupload";
import { CustomError } from "../../domain/errors/custom.error";
import { envs } from "../envs";
import { cloudinary } from "./cloudinary.config";

export class CloudinaryAdapter {
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


    static async uploadImages(file: UploadedFile): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', upload_preset: envs.CLOUDINARY_PRESET }, (error, result) => {
                if (error) return reject(error);
                resolve(result!.secure_url);
            }).end(file.data);
        });
    }

}