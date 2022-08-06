import { IsUUID } from "class-validator";

export class UpdateEmployeeByParamsDto {
  @IsUUID()
  public id: string;
}
