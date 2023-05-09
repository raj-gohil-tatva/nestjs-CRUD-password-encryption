import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SignupUserDTO, UpdateUserDTO } from './DTO/users.dto';
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

  // Update the user by id and provided body.
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.updateUserById(Number(id), body);
  }

  // Remove the user by id.
  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.userService.findAndRemoveById(Number(id));
  }
}
