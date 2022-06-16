import express from "express";
import { OffsettError } from ".";
import pino, { Logger } from "pino";

const logger: Logger = pino({
  name: "Offsett",
  transport: { target: "pino-pretty" },
});

export class OffsettErrorHandler {
  public static handle(error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
    if (error instanceof OffsettError) {
      logger.warn(error);
      res.status(error.httpCode).json({});
    } else {
      logger.error(error);
      res.status(500).json({});
    }
  }
}
