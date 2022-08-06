import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./updateAddressDto";

export class UpdateEmployeeDto {
  @IsOptional()
  @IsUUID()
  public id: string;

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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  public address: Address;
}
