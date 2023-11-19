import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }
  @Post('signin')
  async signin(@Body() credentialsDto: CredentialsDto) {
    return await this.authService.signin(credentialsDto);
  }
}
