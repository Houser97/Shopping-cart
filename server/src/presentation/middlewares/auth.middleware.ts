import { NextFunction, Request, Response } from "express";
import { Passport } from "../../config/passport/passport";
import { RequestWithUser } from "../../domain/interfaces/request-with-user.interface";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthMiddleware {
    static async validateAuthorId(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = (req.headers['authorization']?.split(' '))![1]

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
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring('Bearer '.length);
            try {
                const decoded = await JwtAdapter.validateToken(token); // Usa tu clave secreta
                if (decoded) {
                    req.user = decoded.id;
                }
            } catch (error) {
                console.log(error);
                req.user = '';
            }
        } else {
            req.user = '';
        }

        next();
    }
}