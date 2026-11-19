import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NewUserDto } from './dto/newUser.dto.js';
import { UserService } from './user.service.js';
import { LocalGuard } from './guards/local.guard.js';
import { CurrentUser } from './user.decorator.js';
import { UserDocument } from './model/user.schema.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() newUser: NewUserDto) {
    return await this.userService.create(newUser);
  }

  @UseGuards(LocalGuard)
  @Post()
  async login(@CurrentUser() user: UserDocument) {
    return await this.userService.login(user);
  }
}
