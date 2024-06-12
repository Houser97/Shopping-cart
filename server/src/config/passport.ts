import passport from 'passport'
import { IVerifyOptions, Strategy } from 'passport-local';
import { UserModel } from '../data/mongo/models/user.model';
import { CustomError } from '../domain/errors/custom.error';
import { BcryptAdapter } from './bcrypt.adapter';
import { Request, Response } from 'express';
import { UserEntity } from '../domain/entities/user.entity';

interface User {
    id: string;
}

interface AuthenticateOptions {
    username: string;
    password: string;
    usernameField: string;
    done: (error: any, user?: false | Express.User | undefined, options?: IVerifyOptions | undefined) => void
}

export class Passport {

    constructor(
        private readonly usernameField: string,
    ) { }

    public configure() {
        passport.use(
            new Strategy({ usernameField: this.usernameField }, async (username, password, done) => {
                try {
                    const authenticateOptions = {
                        username, password, done, usernameField: this.usernameField
                    }
                    return await this.auth(authenticateOptions);
                } catch (error) {
                    CustomError.internalServer('Internal server error');
                }
            })
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


    private async auth(authenticateOptions: AuthenticateOptions) {
        const { username, password, usernameField, done } = authenticateOptions;

        if (!username) return done(null, false);

        const user = await UserModel.findOne({ [usernameField]: username });
        if (!user) return done(null, false, { message: `Incorrect ${usernameField}` });

        const passwordMatches = BcryptAdapter.compare(password, user.password);
        if (!passwordMatches) return done(null, false, { message: `Password is incorrect` });

        return done(null, user);
    }

    public initialize() {
        // init passport on every route call.
        return passport.initialize();
    }

    public createSession() {
        // allow passport to use "express-session".
        return passport.session();
    }

    static login(req: Request, res: Response) {
        passport.authenticate('local',
            function (
                err: unknown,
                user: { [key: string]: any } | undefined,
                info: { [key: string]: string } | undefined) {
                if (err) return res.status(500).json({ error: 'Internal server error' })
                if (!user && info) return res.status(401).json({ error: info.message })

                const { password, ...rest } = UserEntity.fromObject(user!);
                return res.status(200).json({ user: rest })
            })(req, res);
    }
}