import { Request, Response } from "express";
import { Passport } from "../../config/passport";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserModel } from "../../data/mongo/models/user.model";
import { CustomError } from "../../domain/errors/custom.error";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { UserEntity } from "../../domain/entities/user.entity";

export class AuthService {
    constructor() { }

    public login(req: Request, res: Response) {
        Passport.login(req, res);
    }

    public async register(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);

            user.password = BcryptAdapter.hash(registerUserDto.password);

            await user.save();
            const { password, ...rest } = UserEntity.fromObject(user);

            return { user: rest };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}

