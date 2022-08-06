import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  public id: string;

  @IsOptional()
  @IsString()
  public line1: string;

  @IsOptional()
  @IsString()
  public line2: string;

  @IsOptional()
  @IsString()
  public city: string;

  @IsOptional()
  @IsString()
  public state: string;

  @IsOptional()
  @IsNumber()
  public pin: number;
}
