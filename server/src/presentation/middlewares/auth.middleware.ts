import { NextFunction, Request, Response } from "express";
import { Passport } from "../../config/passport/passport";
import { RequestWithUser } from "../../domain/interfaces/request-with-user.interface";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthMiddleware {
    static async validateAuthorId(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = this.getTokenFromHeader(req);

        const decodedToken = await JwtAdapter.validateToken(token);
        if (!decodedToken) return res.status(401).json({ error: 'Token was not provided' });

        const { id: userIdLogged } = decodedToken
        const { authorId: userIdInBody } = req.body;

        if (userIdLogged !== userIdInBody)
            return res.status(401).json({ error: 'User Id does not match the Author Id' });

        next();
    }

    static validateAuth(req: Request, res: Response, next: NextFunction) {
        Passport.validateJwtAuth(req, res, next);
    }

    static async optionalAuth(req: Request, res: Response, next: NextFunction) {
        req.user = '';

        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            const token = this.getTokenFromHeader(req);
            try {
                const decoded = await JwtAdapter.validateToken(token);
                req.user = decoded?.id || '';
            } catch (error) {
                console.error('Error validating token:', error);
            }
        }

        next();
    }

    static getTokenFromHeader = (req: Request) => (req.headers['authorization']?.split(' '))![1]
}