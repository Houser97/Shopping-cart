import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    cart: {
        type: [String]
    }
});

userSchema.set('toJSON', {
    virtuals: true, // coloca id como propiedad extra pero sin _.
    versionKey: false, // Quita version key
    transform: function (doc, ret, options) {
        delete ret._id; // Elimina _id
        delete ret.password;
    }
});

export const UserModel = mongoose.model('User', userSchema)