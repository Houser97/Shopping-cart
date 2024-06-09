import passport from "passport";
import { Request, Response } from "express";
import { User } from "../../domain/interfaces/user.interfaces";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {
    constructor() { }

    public login(req: Request, res: Response) {
        passport.authenticate('local',
            function (
                err: unknown,
                user: User | undefined,
                info: { [key: string]: string } | undefined) {
                if (err) return res.status(500).json({ error: 'Internal server error' })
                if (!user && info) return res.status(401).json({ error: info.message })

                const { password, ...rest } = UserEntity.fromObject(user!);
                return res.status(200).json({ user: rest })
            })(req, res);
    }
}

