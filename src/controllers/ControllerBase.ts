import { ResponseBuilder } from "../utils/ApiJsonResponse";
import { Response } from "express";

export class ControllerBase {
    ok<T>(res: Response, data?: T) {
        const response = ResponseBuilder.ok<T>(data)
        return res.status(200).send(response)
    }
    badRequest<T>(res: Response, message?: string, errors?: T) {
        const response = ResponseBuilder.badRequest("ValidationError", errors, message)
        return res.status(200).send(response)
    }
}