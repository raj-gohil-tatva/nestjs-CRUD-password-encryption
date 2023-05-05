import { IsEmail, IsString } from 'class-validator';

export class SignupUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
