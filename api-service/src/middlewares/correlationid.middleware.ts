import * as express from 'express';
import { v4 as uuidV4 } from 'uuid';
import * as httpContext from 'express-http-context';

export const CORRELATION_ID = 'correlationId';
export const X_CORRELATION_ID = 'x-correlation-id';

export function setCorrelationId(correlationId: string): void {
  httpContext.set(CORRELATION_ID, correlationId);
}
export const correlationIdMiddleware = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
): void => {
  const correlationId = req.get(X_CORRELATION_ID) || uuidV4();

  // this is a tmp fix, if we don't do this, the EventSourcingMiddleware of node-event-client-sdk will do with a different id
  req.headers[X_CORRELATION_ID] = correlationId;

  setCorrelationId(correlationId);

  next();
};
