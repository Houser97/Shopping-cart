import jwt from 'jsonwebtoken';
import { envs } from "./envs";
import { JwtPayload } from '../domain/interfaces/jwt-payload.interface';


const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
    static generateToken(payload: JwtPayload, duration: string = '2h') {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);
                resolve(token);
            })
        })
    }

    static validateToken(token: string): Promise<JwtPayload | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as JwtPayload);
            })
        })
    }
}