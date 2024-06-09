import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import passport from "passport";

export class AuthMiddleware {
    static validatePassportAuth(req: Request, res: Response, next: NextFunction) {
        const isAuthenticated = req.isAuthenticated();
        if (!isAuthenticated) return res.status(401).json({ error: 'Login to create reviews' });

        next();
    }

    static get authenticate() {
        return passport.authenticate('local', {
            keepSessionInfo: true,
            failureRedirect: '/api/login'
        })
    }

    static get sanitizeEmail() {
        return check('email').isEmail()
            .trim()
            .escape()
            .normalizeEmail();
    }

}