import passport from 'passport'
import { UserModel } from '../../data/mongo/models/user.model';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../../domain/entities/user.entity';
import { PassportStrategies } from './strategies';

interface User {
    _id: string;
    password: string;
    cart: string[],
    username: string
}

export class Passport {

    constructor(
        private readonly usernameField: string = '',
    ) { }

    public configure() {
        passport.use(
            //PassportStrategies.LocalStrategy({usernameField: this.usernameField})
            PassportStrategies.JwtStrategy()
        );

        //Creación de Cookie para mantener usuario en sesión.
        passport.serializeUser((user: any, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            UserModel.findById(id, (err: string, user: User) => {
                done(err, user);
            })
        });
    }

    public initialize() {
        // init passport on every route call.
        return passport.initialize();
    }

    static validateLocalAuth(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local',
            function (
                err: unknown,
                user: { [key: string]: any } | undefined,
                info: { [key: string]: string } | undefined) {
                if (err) return res.status(500).json({ error: 'Internal server error' })
                if (!user && info) return res.status(401).json({ error: info.message })

                const { password, ...rest } = UserEntity.fromObject(user!);
                req.login(user!, next)
                return res.status(200).json({ user: rest })
            })(req, res, next);
    }

    static validateJwtAuth(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt',
            function (
                err: unknown,
                user: { [key: string]: any } | undefined,
                info: { [key: string]: string } | undefined) {

                if (err) return res.status(500).json({ error: 'Internal server error' })
                if (!user && info) return res.status(401).json({ error: info.message })

                req.user = user;

                next()
            })(req, res, next);
    }
}