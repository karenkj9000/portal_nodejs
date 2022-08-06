import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";

export class EmployeeService {
  constructor(private employeeRepo: EmployeeRespository) {}
  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepo.getAllEmployees();
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employee = await this.employeeRepo.getEmployeeById(id);

    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }
    return employee;
  }

  public async createEmployee(
    employeeDetails: CreateEmployeeDto
  ): Promise<Employee> {
    try {
      employeeDetails = {
        ...employeeDetails,
        password: await bcrypt.hash(employeeDetails.password, 10),
      };
      const save = await this.employeeRepo.saveEmployeeDetails(employeeDetails);
      return save;
    } catch (err) {
      throw new HttpException(
        400,
        "Failed to create employee",
        "CREATE SERVICE FAILED"
      );
    }
  }

  public async updateEmployeeById(
    id: string,
    employeeDetails: UpdateEmployeeDto
  ): Promise<Employee> {
    const employee = await this.employeeRepo.getEmployeeById(id);
    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }

    try {
      employeeDetails.address.id = employee.address.id;
      const oldPassword = employee.password;
      employeeDetails = {
        ...employeeDetails,
        password: employeeDetails.password
          ? await bcrypt.hash(employeeDetails.password, 10)
          : oldPassword,
      };
      const save = await this.employeeRepo.updateEmployeeDetails(
        id,
        employeeDetails
      );
      return save;
    } catch (err) {
      throw new HttpException(
        400,
        "Failed to update employee",
        "UPDATE SERVICE FAILED"
      );
    }
  }

  public async softDeleteEmployeeById(id: string): Promise<Employee> {
    const employee = await this.getEmployeeById(id);
    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }
    try {
      return await this.employeeRepo.softDeleteEmployeeById(id);
    } catch (err) {
      throw new HttpException(
        400,
        "Failed to delete employee",
        "EMPLOYEE DELETE FAILED"
      );
    }
  }

  public employeeLogin = async (name: string, password: string) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByUsername(name);
    if (!employeeDetails) {
      throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
    }

    const validPassword = await bcrypt.compare(
      password,
      employeeDetails.password
    );
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        "custom:role": employeeDetails.role,
      };

      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException(
        ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD
      );
    }
  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}
