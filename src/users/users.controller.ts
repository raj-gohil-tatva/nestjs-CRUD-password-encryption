import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SignupUserDTO } from './DTO/users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create the user.
  @Post('/signup')
  createUser(@Body() body: SignupUserDTO) {
    const { email, password } = body;
    return this.userService.createUser(email, password);
  }

  // Get the User.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  // Get the user list from the provided email.
  @Get()
  findAllByEmail(@Query('email') email: string) {
    return this.userService.findAllByEmail(email);
  }
}
