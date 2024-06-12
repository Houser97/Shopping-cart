import { Request, Response } from "express";
import { Passport } from "../../config/passport";

export class AuthService {
    constructor() { }

    public login(req: Request, res: Response) {
        Passport.login(req, res);
    }
}

