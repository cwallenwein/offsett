export enum HttpStatusCode {
  UNKNOWN = -1, // unkown error
  OK = 200, // successful
  BAD_REQUEST = 400, // client error
  UNAUTHORIZED = 401, // authentification necessary
  NOT_FOUND = 404, // resource not found
  INTERNAL_SERVER_ERROR = 500, // Offsett error
}

export enum ErrorOrigin {
  AXIOS,
  BLOCKCHAIR = "BLOCKCHAIR",
  UNKNOWN = "UNKNOWN",
  OFFSETT = "OFFSETT",
  UTILITY = "UTILITY",
  SETUP = "SETUP",
  AUTHENTICATION = "AUTHENTICATION",
}

export enum OffsettErrorDescriptions {
  UNKNOWN_BITCOIN_ADDRESS = "Unknown Bitcoin address",
  UNKNOWN_ERROR = "Unknown error",
  AXIOS_ERROR = "Axios error",
  BLOCKCHAIR_LIMIT_EXCEEDED = "Blockchair limit was exceeded",
  BLOCKCHAIR_GET_ADDRESS_FAILED = "Blockchair get address failed",
  BLOCKCHAIR_INVALID_TRANSACTION_COUNT = "Blockchair returned and invalid number of transactions",
  BLOCKCHAIR_ERROR = "Blockchair Error",
  BLOCKCHAIR_GET_DAILY_TRANSACTION_COUNT_FAILED = "Blockchair get address failed",
  BITCOIN_TRANSACTION_VALIDATION_ERROR = "Validation of bitcoin transaction failed",
  BITCOIN_ADDRESS_VALIDATION_ERROR = "Validation of bitcoin address failed",
  SETUP_FAILED = "Setup failed",
}

export class OffsettError extends Error {
  override name: string;

  constructor(
    public readonly origin: ErrorOrigin,
    public readonly httpCode: HttpStatusCode,
    public readonly description: string,
    public isOperational: boolean,
  ) {
    super(description);
    this.name = HttpStatusCode[httpCode] as string;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  setIsOperational(isOperational: boolean) {
    this.isOperational = isOperational;
  }

  is4xx() {
    return this.httpCode >= 400 && this.httpCode < 500;
  }

  is5xx() {
    return this.httpCode >= 500 && this.httpCode < 600;
  }

  static ofErrorMessage(errorMessage: string): OffsettError {
    return new OffsettError(ErrorOrigin.UNKNOWN, HttpStatusCode.INTERNAL_SERVER_ERROR, errorMessage, false);
  }

  static readonly UNKOWN_ERROR = new OffsettError(
    ErrorOrigin.UNKNOWN,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Unknown Error",
    false,
  );

  static readonly BLOCKCHAIR_ERROR = new OffsettError(
    ErrorOrigin.BLOCKCHAIR,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Blockchair Error",
    false,
  );

  static readonly BLOCKCHAIR_REQUEST_FAILED = new OffsettError(
    ErrorOrigin.BLOCKCHAIR,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Blockchair request failed",
    false,
  );

  static readonly BLOCKCHAIR_LIMIT_EXCEEDED = new OffsettError(
    ErrorOrigin.BLOCKCHAIR,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Blockchair limit was exceeded",
    true,
  );

  static readonly AXIOS_ERROR = new OffsettError(
    ErrorOrigin.AXIOS,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Axios error",
    false,
  );

  static readonly SETUP_ERROR = new OffsettError(
    ErrorOrigin.SETUP,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    "Unkown error during setup",
    false,
  );
}

export class OperationalOffsettError extends OffsettError {
  constructor(
    public override readonly origin: ErrorOrigin,
    public override readonly httpCode: HttpStatusCode,
    public override readonly description: string,
  ) {
    super(origin, httpCode, description, true);
  }
}

export class ProgrammaticOffsettError extends OffsettError {
  constructor(
    public override readonly origin: ErrorOrigin,
    public override readonly httpCode: HttpStatusCode,
    public override readonly description: string,
  ) {
    super(origin, httpCode, description, false);
  }
}
