import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
  async getAllEmployees(): Promise<Employee[]> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.find();
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne(id);
  }

  public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
    const employeeRepo = getConnection().getRepository(Employee);
    const updateEmployeeDetails = await employeeRepo.update(
      { id: employeeId, deletedAt: null },
      employeeDetails
    );
    return updateEmployeeDetails;
  }

  public async softDeleteEmployeeById(id: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.softDelete({
      id,
    });
  }
  public async saveEmployeeDetails(employeeDetails: Employee) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.save(employeeDetails);
  }
}
