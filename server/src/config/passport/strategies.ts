import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { CustomError } from "../../domain/errors/custom.error";
import { UserModel } from "../../data/mongo/models/user.model";
import { BcryptAdapter } from "../bcrypt.adapter";
import { envs } from "../envs";

interface StrategyOptions {
    usernameField: string
}

export class PassportStrategies {

    static LocalStrategy(options: StrategyOptions) {
        const { usernameField } = options;
        return new LocalStrategy({ usernameField }, async (username, password, done) => {
            try {
                if (!username) return done(null, false);

                const user = await UserModel.findOne({ [usernameField]: username });
                if (!user) return done(null, false, { message: `Incorrect ${usernameField}` });

                const passwordMatches = BcryptAdapter.compare(password, user.password);
                if (!passwordMatches) return done(null, false, { message: `Password is incorrect` });

                return done(null, user);
            } catch (error) {
                throw CustomError.internalServer('Internal server error');
            }
        })
    }

    static JwtStrategy() {

        const jwtStrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envs.JWT_SECRET,
        }

        return new JwtStrategy(jwtStrategyOptions, async (payload, done) => {
            try {
                const user = await UserModel.findById(payload.id);
                if (user) return done(null, user);
                return done(null, false);
            } catch (error) {
                throw CustomError.internalServer('Internal server error');
            }
        })
    }
}