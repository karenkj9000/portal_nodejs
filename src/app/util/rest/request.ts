import { Request } from "express";

/**
 * Interface to add extra modifiers to request.
 */
export default interface RequestWithUser extends Request {
  startTime?: number;
  userAgent?: { [key: string]: any };
}
