export class RegisterUserDto {
    constructor(
        public email: string,
        public password: string,
        public username: string,
        public cart: string[]
    ) { }

    static create(object: { [key: string]: string }): [string?, RegisterUserDto?] {
        const { email, pwd, username } = object;

        return [undefined, new RegisterUserDto(email, pwd, username, [])]
    }
}