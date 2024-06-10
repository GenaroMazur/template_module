// Error 400
export class BadRequestException extends Error {
    constructor(message?:string){
        super(message)
    }
}

//Error 401
export class UnautorizedException extends Error {
    constructor(message?:string){
        super(message)
    }
}

//Error 403
export class ForbiddenException extends Error {
    constructor(message?:string){
        super(message)
    }
}

// Error 404
export class NotFoundException extends Error{
    constructor(message?:string){
        super(message)
    }
}

//Error 405
export class MethodNotAllowedException extends Error {
    constructor(message?:string){
        super(message)
    }
}

// Error 500
export class ServerError extends Error {
    constructor(message?:string){
        super(message)
    }
}