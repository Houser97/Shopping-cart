import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
    static validatePassportAuth(req: Request, res: Response, next: NextFunction) {
        const isAuthenticated = req.isAuthenticated();
        if (!isAuthenticated) return res.status(401).json({ error: 'Login to create reviews' });

        next();
    }
}