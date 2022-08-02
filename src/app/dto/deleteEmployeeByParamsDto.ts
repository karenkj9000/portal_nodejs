import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class DeleteEmployeeByParamsDto {
  @IsUUID()
  public id: string;
}
