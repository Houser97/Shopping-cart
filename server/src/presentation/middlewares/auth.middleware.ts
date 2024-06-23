import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { Passport } from "../../config/passport/passport";
import { RequestWithUser } from "../../domain/interfaces/request-with-user.interface";

export class AuthMiddleware {
    static validateAuthorId(req: RequestWithUser, res: Response, next: NextFunction) {
        const { _id } = req.user;
        const { authorId: userInBody } = req.body;

        if (_id as any !== userInBody) throw CustomError.unauthorized('User Id does not match the Author Id');

        next();
    }

    static validateAuth(req: Request, res: Response, next: NextFunction) {
        Passport.validateJwtAuth(req, res, next);
    }
}