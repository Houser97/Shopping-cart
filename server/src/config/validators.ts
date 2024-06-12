import { NextFunction, Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import mongoose from "mongoose";

export class Validators {
    static isMongoID(id: string) {
        return mongoose.isValidObjectId(id);
    }

    static isValidEmail() {
        return check('email').isEmail().withMessage('Not a valid e-mail address')
            .trim()
            .escape()
            .normalizeEmail()

    }

    static isValidPassword() {
        return body('pwd')
            .isLength({ min: 4 }).withMessage('Password must contain at least 4 characters.')
            .matches('[A-Z]').withMessage('Password must contain at least 1 upper letter.')
            .matches('[0-9]').withMessage('Password must contain at least 1 number.')
            .trim()
            .escape()
    }

    static validateFields(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(({ msg }) => msg);
            return res.status(401).json({ error: messages });
        }
        next()
    }
}