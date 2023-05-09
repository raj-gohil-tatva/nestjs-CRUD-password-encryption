import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignupUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
