// import { Strategy as LocalStrategy } from "passport-local";
// import { BcryptAdapter } from "../bcrypt.adapter";

// static LocalStrategy(options: StrategyOptions) {
//     const { usernameField } = options;
//     return new LocalStrategy({ usernameField }, async (username, password, done) => {
//         try {
//             if (!username) return done(null, false);

//             const user = await UserModel.findOne({ [usernameField]: username });
//             if (!user) return done(null, false, { message: `Incorrect ${usernameField}` });

//             const passwordMatches = BcryptAdapter.compare(password, user.password);
//             if (!passwordMatches) return done(null, false, { message: `Password is incorrect` });

//             return done(null, user);
//         } catch (error) {
//             throw CustomError.internalServer('Internal server error');
//         }
//     })
// }