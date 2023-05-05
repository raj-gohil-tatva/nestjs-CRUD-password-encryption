import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserDTO } from './DTO/users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: SignupUserDTO) {
    const { email, password } = body;
    return this.userService.createUser(email, password);
  }
}
