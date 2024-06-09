import { regularExps } from "../../../config/regular-exp";

export class LoginUserDto {
    constructor(
        public email: string,
        public password: string,
    ) { }

    static login(object: { [key: string]: string }): [string?, LoginUserDto?] {
        const { email, password } = object;

        if (!email) return ['Missing email'];
        if (!regularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];

        return [undefined, new LoginUserDto(email, password)];
    }
}