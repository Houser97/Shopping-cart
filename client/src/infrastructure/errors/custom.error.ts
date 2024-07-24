export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message)
    }

    static formatError(message: string, status: number) {
        return {
            status, message
        }
    }
}