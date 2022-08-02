import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
  @IsString()
  public name: string;

  @IsString()
  public role: string;

  @IsString()
  public status: string;

  @IsNumber()
  public experience: number;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsNumber()
  public age: number;

  @IsString()
  public departmentId: string;
}
