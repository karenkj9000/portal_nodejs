import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";

/**
 * This exception can use used in case a user has incorrect role.
 */
class UserInvalidRoleException extends HttpException {
  constructor(error: CustomError) {
    super(409, error.MESSAGE, error.CODE);
  }
}

export default UserInvalidRoleException;
