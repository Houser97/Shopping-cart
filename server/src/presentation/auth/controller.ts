import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    login = async (req: Request, res: Response) => {
        if (req.user) {
            return res.status(200).json({ user: req.user })
        }

        return res.status(401).json({ error: 'Email or Password incorrect' })

    }
}