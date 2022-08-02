import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateDepartmentByParamsDto {
  @IsUUID()
  public id: string;
}
