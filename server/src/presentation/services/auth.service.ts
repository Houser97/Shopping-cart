import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserModel } from "../../data/mongo/models/user.model";
import { CustomError } from "../../domain/errors/custom.error";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthService {
    constructor() { }

    public async login(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email })
        if (!user) throw CustomError.badRequest('User does not exist');

        try {
            const passwordMatches = BcryptAdapter.compare(loginUserDto.password, user.password);
            if (!passwordMatches) throw CustomError.badRequest('Password is incorrect');

            const { password, ...rest } = UserEntity.fromObject(user);
            const token = await this.generateToken(user.id);

            return {
                user: rest,
                token: token
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async register(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);

            user.password = BcryptAdapter.hash(registerUserDto.password);

            await user.save();
            const { password, ...rest } = UserEntity.fromObject(user);
            const token = await this.generateToken(user.id);

            return {
                user: rest,
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async logout(req: Request, res: Response) {
        req.logout((err) => {
            if (err) return res.json(err);
            return res.json(true);
        })
    }

    public async checkStatus(req: Request, res: Response) {
        const token = (req.headers['authorization']?.split(' '))![1];
        const user = req.user as any;
        const { password, ...rest } = UserEntity.fromObject(user);
        return res.json({
            user: rest,
            token
        })
    }

    private async generateToken(id: string) {
        const token = await JwtAdapter.generateToken({ id });
        if (!token) throw CustomError.internalServer('Error while creating JWT');

        return token
    }
}

