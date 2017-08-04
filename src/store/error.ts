export class KolhoosiError extends Error {
    name: string = 'KolhoosiAPI Error';
    errors: string[];

    constructor(message: string, errors: string[]) {
        super(message);
        this.errors = errors;
    }
}