import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  public name: string;
}
