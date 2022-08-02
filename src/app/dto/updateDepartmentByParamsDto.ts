import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentByParamsDto {
  @IsOptional()
  @IsUUID()
  public id: string;
}
