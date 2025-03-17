export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message);
    }

    static formatError(error: unknown): CustomError {
        if (error instanceof Error) {
            if (
                (error as any).response && 
                typeof (error as any).response.status === 'number' && 
                typeof (error as any).response.data?.error === 'string'
            ) {
                const { status, data } = (error as any).response;
                return new CustomError(status, data.error);
            }
            return new CustomError(500, error.message);
        }
        return new CustomError(500, "Unknown error occurred");
    }
}
