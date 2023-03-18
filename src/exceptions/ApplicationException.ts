
export type ErrorCodes =
  | 'DuplicateNameError'
  | 'NotFoundError'
  | 'UnknownError'
  | 'ValidationError'
  | 'DuplicateError'
  | 'InputParameterError';

export class ApplicationException<T> extends Error {
  name: string;
  errorCode: ErrorCodes;
  errors?: T;
  stack?: string | undefined;
  constructor(message: string, errorCode: ErrorCodes, errors?: T) {
    super(message);
    this.name = errorCode;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}
