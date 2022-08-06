import { IsUUID } from "class-validator";

export class GetDepartmentByParamsDto {
  @IsUUID()
  public id: string;
}
