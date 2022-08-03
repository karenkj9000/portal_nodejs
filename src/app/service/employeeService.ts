import { plainToClass } from "class-transformer";
import { EntityNotFoundError } from "typeorm";
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
import { Address } from "../entities/Address";

export class EmployeeService {
  constructor(private employeeRepo: EmployeeRespository) {}
  async getAllEmployees() {
    return await this.employeeRepo.getAllEmployees();
  }

  async getEmployeeById(id: string) {
    const employee = await this.employeeRepo.getEmployeeById(id);

    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }
    return employee;
  }

  public async createEmployee(
    employeeDetails: CreateEmployeeDto
  ): Promise<CreateEmployeeDto & Employee> {
    try {
      const newAddress = plainToClass(Address, {
        line1: employeeDetails.address.line1,
        line2: employeeDetails.address.line2,
        city: employeeDetails.address.city,
        state: employeeDetails.address.state,
        pin: employeeDetails.address.pin,
      });
      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        role: employeeDetails.role,
        status: employeeDetails.status,
        experience: employeeDetails.experience,
        dateofjoining: employeeDetails.dateofjoining,
        username: employeeDetails.username,
        password: employeeDetails.password
          ? await bcrypt.hash(employeeDetails.password, 10)
          : "",
        age: employeeDetails.age,
        departmentId: employeeDetails.departmentId,
        address: newAddress,
      });
      const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
      // throw new HttpException(400, "Failed to create employee", "code-400");
      throw err;
    }
  }

  public async updateEmployeeById(
    id: string,
    employeeDetails: UpdateEmployeeDto
  ) {
    try {
      const updatedAddress = plainToClass(Address, {
        id: employeeDetails.addressId,
        line1: employeeDetails.address.line1,
        line2: employeeDetails.address.line2,
        city: employeeDetails.address.city,
        state: employeeDetails.address.state,
        pin: employeeDetails.address.pin,
      });

      const updatedEmployee = plainToClass(Employee, {
        id: id,
        name: employeeDetails.name,
        dateofjoining: employeeDetails.dateofjoining,
        role: employeeDetails.role,
        status: employeeDetails.status,
        experience: employeeDetails.experience,
        username: employeeDetails.username,
        password: employeeDetails.password
          ? await bcrypt.hash(employeeDetails.password, 10)
          : "",
        age: employeeDetails.age,
        departmentId: employeeDetails.departmentId,
        address: updatedAddress,
      });
      const save = await this.employeeRepo.updateEmployeeDetails(
        updatedEmployee
      );
      return save;
    } catch (err) {
      // throw new HttpException(400, "Failed to create employee", "code-400");
      throw err;
    }
  }

  public async softDeleteEmployeeById(id: string) {
    try {
      await this.getEmployeeById(id);
      return await this.employeeRepo.softDeleteEmployeeById(id);
    } catch (err) {
      throw err;
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
