import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";

export class EmployeeService {
  constructor(private employeeRepo: EmployeeRespository) {}
  async getAllEmployees() {
    return await this.employeeRepo.getAllEmployees();
  }

  async getEmployeeById(id: string) {
    return await this.employeeRepo.getEmployeeById(id);
  }

  public async createEmployee(employeeDetails: any) {
    try {
      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        // username: employeeDetails.username,
        // age: employeeDetails.age,
        departmentId: employeeDetails.departmentId,
        // isActive: true,
      });
      const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create employee", "code-400");
    }
  }

  public async updateEmployeeById(id: string, employeeDetails: any) {
    try {
      const updatedEmployee = plainToClass(Employee, {
        name: employeeDetails.name,
        departmentId: employeeDetails.departmentId,
      });
      const save = await this.employeeRepo.updateEmployeeDetails(
        id,
        updatedEmployee
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create employee", "code-400");
    }
  }

  public async softDeleteEmployeeById(id: string) {
    return await this.employeeRepo.softDeleteEmployeeById(id);
  }
}
