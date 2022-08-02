import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

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
  public dateofjoining: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsNumber()
  public age: number;

  @IsString()
  public departmentId: string;

  //   // Validating nested objects
  //   @ValidateNested({ each: true })
  //   @Type(() => <Your nested DTO>)
}
