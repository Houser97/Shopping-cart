import passport from 'passport'
import { Strategy } from 'passport-local';
import { UserModel } from '../data/mongo/models/user.model';
import { AuthService } from '../presentation/services/auth.service';
import { CustomError } from '../domain/errors/custom.error';

interface User {
    id: string;
}

interface Options {
    usernameField: string;
    authService: AuthService
}

export class Passport {

    private readonly usernameField: string;
    private readonly authService: AuthService;

    constructor(options: Options) {
        const { usernameField, authService } = options;

        this.usernameField = usernameField;
        this.authService = authService;
    }

    public configure() {
        passport.use(
            new Strategy({ usernameField: this.usernameField }, async (username, password, done) => {
                try {
                    const authenticateOptions = {
                        username, password, done, usernameField: this.usernameField
                    }
                    return await this.authService.authenticate(authenticateOptions);
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

    public initialize() {
        return passport.initialize();
    }

    public createSession() {
        return passport.session();
    }
}