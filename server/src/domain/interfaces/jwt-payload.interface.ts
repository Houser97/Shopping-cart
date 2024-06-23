import { JwtPayload as OriginalJwtPayload } from 'jsonwebtoken';

export interface JwtPayload extends OriginalJwtPayload {
    id: string;
}