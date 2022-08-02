import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";

/**
 * This exception can use used in case a incorrect username or password is given.
 */
class EntityNotFoundException extends HttpException {
  constructor(error: CustomError) {
    super(409, error.MESSAGE, error.CODE);
  }
}

export default EntityNotFoundException;
