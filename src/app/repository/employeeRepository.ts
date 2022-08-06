import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
  async getAllEmployees(): Promise<Employee[]> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.find({ relations: ["address"] });
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.findOne({ where: { id: id }, relations: ["address"] });
  }

  public async updateEmployeeDetails(
    id: string,
    employeeDetails: UpdateEmployeeDto
  ) {
    employeeDetails.id = id;
    const employeeRepo = getConnection().getRepository(Employee);
    const data = await employeeRepo.save(employeeDetails);
    return data;
  }

  public async softDeleteEmployeeById(id: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employee = await employeeRepo.findOne({
      where: { id: id },
      relations: ["address"],
    });
    return employeeRepo.softRemove(employee);
  }
  public async saveEmployeeDetails(employeeDetails: CreateEmployeeDto) {
    const employeeRepo = getConnection().getRepository(Employee);
    return employeeRepo.save(employeeDetails);
  }

  public async getEmployeeByUsername(username: string) {
    const employeeRepo = getConnection().getRepository(Employee);
    const employeeDetail = await employeeRepo.findOne({
      where: { name: username },
    });
    return employeeDetail;
  }
}
