export class UserEntity {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public cart: [string],
    ) { }
}