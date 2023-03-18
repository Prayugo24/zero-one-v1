import { Response, Request, NextFunction } from 'express';
import Constanta from '../utils/Constanta';
import { ApplicationException } from "../exceptions/ApplicationException"
import { ResponseBuilder } from "../utils/ApiJsonResponse"

function isApplicationException(error: any) {
    return error instanceof ApplicationException
}

function isError(error: any) {
    return error instanceof Error
}

function handleApplicationException(res: Response, error: ApplicationException<any>) {
    const badRequestResponse = ResponseBuilder.badRequest(error.errorCode, error.errors, error.message)
    res.status(400).send(badRequestResponse)
}

function handleUnknownError(res: Response, error: Error) {
    const currentEnv = Constanta.NODE_ENV
    let errMessage = error.message;
    let stack = error.stack
    if (currentEnv === "production") {
        errMessage = "Something went wrong, that's all we know!"
        stack = undefined
    }

    const unknownErrorResponse = ResponseBuilder.internalServerError(errMessage, "UnknownError", stack)
    res.status(500).send(unknownErrorResponse)
}

export function exceptionHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (isApplicationException(error)) {
        handleApplicationException(res, error)
    } else {
        if (isError(error)) {
            handleUnknownError(res, error)
        }
    }
    next()
}