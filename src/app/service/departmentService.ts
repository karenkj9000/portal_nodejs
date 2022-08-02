import { plainToClass } from "class-transformer";
import { EntityNotFoundError } from "typeorm";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService {
  constructor(private departmentRepo: DepartmentRespository) {}
  async getAllDepartments() {
    return await this.departmentRepo.getAllDepartments();
  }

  async getDepartmentById(id: string) {
    const department = await this.departmentRepo.getDepartmentById(id);
    if (!department) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
    return department;
  }

  public async createDepartment(departmentDetails: any) {
    try {
      const newDepartment = plainToClass(Department, {
        name: departmentDetails.name,
      });
      const save = await this.departmentRepo.saveDepartmentDetails(
        newDepartment
      );
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create department", "code-400");
    }
  }

  public async updateDepartmentById(id: string, departmentDetails: any) {
    try {
      await this.getDepartmentById(id);
      const save = await this.departmentRepo.updateDepartmentDetails(
        id,
        departmentDetails
      );
      return save;
    } catch (err) {
      //throw new HttpException(400, "Failed to create department", "code-400");
      throw err;
    }
  }

  public async softDeleteDepartmentById(id: string) {
    try {
      await this.getDepartmentById(id);
      return await this.departmentRepo.softDeleteDepartmentById(id);
    } catch (err) {
      throw err;
    }
  }
}
