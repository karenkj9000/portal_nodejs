import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class DeleteDepartmentByParamsDto {
  @IsUUID()
  public id: string;
}
