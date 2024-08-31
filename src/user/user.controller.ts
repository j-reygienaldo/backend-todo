import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  registerUser(@Body() dto: AuthDto) {
    return this.userService.registerUser(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthDto) {
    return this.userService.login(dto);
  }
}
