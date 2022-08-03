import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { Department } from "../entities/Department";
import { CreateAddressDto } from "./createAddressDto";
import { CreateDepartmentDto } from "./createDepartmentDto";

export class CreateEmployeeDto {
  @IsString()
  public name: string;

  @IsString()
  public role: string;

  @IsString()
  public status: string;

  @IsNumber()
  public experience: number;

  @IsString()
  public dateofjoining: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsNumber()
  public age: number;

  @IsString()
  public departmentId: string;

  // Validating nested objects
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  public address: CreateAddressDto;

  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentDto)
  public department?: CreateDepartmentDto;
}
