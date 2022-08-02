import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class GetEmployeeByParamsDto {
  @IsUUID()
  public id: string;
}
