export class UseerAlreadyExistsError extends Error{
    constructor() {
        super('E-mail already Exists')
    }
}