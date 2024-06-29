import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { CustomError } from "../../domain/errors/custom.error";
import { UserModel } from "../../data/mongo/models/user.model";

import { envs } from "../envs";


export class PassportStrategies {
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