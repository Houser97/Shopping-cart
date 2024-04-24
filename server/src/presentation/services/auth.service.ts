import { IVerifyOptions } from "passport-local";
import { UserModel } from "../../data/mongo/models/user.model";
import { BcryptAdapter } from "../../config/bcrypt.adapter";

interface AuthenticateOptions {
    username: string;
    password: string;
    usernameField: string;
    done: (error: any, user?: false | Express.User | undefined, options?: IVerifyOptions | undefined) => void
}

export class AuthService {
    constructor() { }

    public async authenticate(authenticateOptions: AuthenticateOptions) {
        const { username, password, usernameField, done } = authenticateOptions;

        if (!username) return done(null, false);

        const user = await UserModel.findOne({ [usernameField]: username });
        if (!user) return done(null, false, { message: `Incorrect ${usernameField}` });

        const passwordMatches = BcryptAdapter.compare(password, user.password);
        if (!passwordMatches) return done(null, false, { message: `Password is incorrect` });

        return done(null, user);
    }
}