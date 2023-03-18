import { Response } from "express";
import { ErrorCodes } from '../exceptions/ApplicationException';

export type HttpResponseStatus = "OK" | "BadRequest" | "InternalServerError"

/**
 * Represent the base http response
 */
export interface HttpResponse {
  status: HttpResponseStatus
}

/**
 * Represents http response when success
 */
export interface SuccessResponse<T> extends HttpResponse {
  result?: T
}

/**
 * Represents http response when bad request
 */
export interface BadRequestResponse<T> extends HttpResponse {
  message: string
  errorCode: ErrorCodes
  errors?: T
}

/**
 * Represents http response when unknown error
 */
export interface UnhandledErrorResponse<T> extends HttpResponse {
  message: string
  errorCode: ErrorCodes
  stack?: string | undefined;
}

export class ResponseBuilder {
  static ok = <T>(result?: T): SuccessResponse<T> => {
    const response: SuccessResponse<T> = {
      status: "OK",
      result: result
    }
    return response
  }

  static badRequest = <T>(errorCode: ErrorCodes, errors: T, message?: string): BadRequestResponse<T> => {
    const response: BadRequestResponse<T> = {
      status: "BadRequest",
      message: message || "Bad request",
      errorCode: errorCode,
      errors: errors
    }
    return response
  }

  static internalServerError = <T>(message?: string, errorCode?: ErrorCodes, stack?: string | undefined): UnhandledErrorResponse<T> => {
    const response: UnhandledErrorResponse<T> = {
      status: "InternalServerError",
      message: message || "Internal server error",
      errorCode: errorCode || "UnknownError",
      stack: stack
    }
    return response
  }
}

class ApiJsonResponse {
  public static responseJson = (
    res: Response,
    data: object = [],
    message: string = '',
    statusCode: number = 200,
    status: string = 'OK',
    errorCode?: ErrorCodes
  ) => {
    return res.status(statusCode).send({
      status,
      code: statusCode,
      message,
      result: data,
      errorCode: errorCode
    });
  };
}

export default ApiJsonResponse;
