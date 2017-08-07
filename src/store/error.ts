export class KolhoosiError extends Error {
    errors: string[];
    isError: boolean;

    constructor(message: string, errors: string[]) {
        super(message);
        this.errors = errors;
        this.isError = message.length !== 0;
    }
}