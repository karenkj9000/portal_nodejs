import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./updateAddressDto";

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public role: string;

  @IsOptional()
  @IsString()
  public status: string;

  @IsOptional()
  @IsNumber()
  public experience: number;

  @IsOptional()
  @IsString()
  public dateofjoining: string;

  @IsOptional()
  @IsString()
  public username: string;

  @IsOptional()
  @IsString()
  public password: string;

  @IsOptional()
  @IsNumber()
  public age: number;

  @IsOptional()
  @IsString()
  public departmentId?: string;

  @IsOptional()
  @IsString()
  public addressId?: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  public address: Address;
}
