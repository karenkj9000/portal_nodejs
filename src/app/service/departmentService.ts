import { CreateDepartmentDto } from "../dto/createDepartmentDto";
import { UpdateDepartmentDto } from "../dto/updateDepartmentDto";
import { Department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";
import { ErrorCodes } from "../util/errorCode";

export class DepartmentService {
  constructor(private departmentRepo: DepartmentRespository) {}
  async getAllDepartments(): Promise<Department[]> {
    return await this.departmentRepo.getAllDepartments();
  }

  async getDepartmentById(id: string): Promise<Department> {
    const department = await this.departmentRepo.getDepartmentById(id);
    if (!department) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
    return department;
  }

  public async createDepartment(
    departmentDetails: CreateDepartmentDto
  ): Promise<Department> {
    try {
      const save = await this.departmentRepo.saveDepartmentDetails(
        departmentDetails
      );
      return save;
    } catch (err) {
      throw new HttpException(
        400,
        "Failed to create department",
        "DEPARTMENT SERVICE FAILED"
      );
    }
  }

  public async updateDepartmentById(
    id: string,
    departmentDetails: UpdateDepartmentDto
  ) {
    const department = await this.departmentRepo.getDepartmentById(id);
    if (!department) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
    try {
      const save = await this.departmentRepo.updateDepartmentDetails(
        id,
        departmentDetails
      );
      return save;
    } catch (err) {
      throw new HttpException(
        400,
        "Failed to update department",
        "DEPARTMENT UPDATE FAILED"
      );
    }
  }

  public async softDeleteDepartmentById(id: string) {
    const department = await this.departmentRepo.getDepartmentById(id);
    if (!department) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    }
    try {
      return await this.departmentRepo.softDeleteDepartmentById(id);
    } catch (err) {
      throw new HttpException(
        400,
        "Failed to delete department",
        "DEPARTMENT DELETE FAILED"
      );
    }
  }
}
