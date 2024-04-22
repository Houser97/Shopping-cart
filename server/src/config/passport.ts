import passport from 'passport'
import { Strategy } from 'passport-local';
import { UserModel } from '../data/mongo/models/user.model';
import { BcryptAdapter } from './bcrypt.adapter';

interface User {
    id: string;
}

export class Passport {

    constructor(
        private readonly username_field: string,
    ) { }

    public configure() {
        passport.use(
            new Strategy({ usernameField: this.username_field }, async (username, password, done) => {
                try {
                    if (!username) return done(null, false);
                    const user = await UserModel.findOne({ [this.username_field]: username });
                    if (!user) return done(null, false, { message: `Incorrect ${this.username_field}` });
                    const passwordMatches = BcryptAdapter.compare(password, user.password);

                    if (!passwordMatches) return done(null, false, { message: `Password is incorrect` });
                    return done(null, user);
                } catch (error) {
                    throw error;
                }
            })
        );

        //Creación de Cookie para mantener usuario en sesión.
        passport.serializeUser((user: any, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            UserModel.findById(id, (err: string, user: User) => {
                done(err, user)
            })
        });
    }

    public initialize() {
        return passport.initialize();
    }

    public createSession() {
        return passport.session();
    }
}