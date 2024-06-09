import { CustomError } from "../errors/custom.error";

export class UserEntity {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public cart: [string],
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { _id, email, username, cart, password } = object;

        if (!_id) {
            throw CustomError.badRequest('Missing id');
        }

        if (!email) throw CustomError.badRequest('Missing email');
        if (!username) throw CustomError.badRequest('Missing username');
        if (!cart) throw CustomError.badRequest('Missing cart');
        if (!password) throw CustomError.badRequest('Missing password');

        return new UserEntity(_id, username, email, password, cart);
    }
}