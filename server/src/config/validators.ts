import mongoose from "mongoose";

export class Validators {
    static isMongoID(id: string) {
        return mongoose.isValidObjectId(id);
    }
}