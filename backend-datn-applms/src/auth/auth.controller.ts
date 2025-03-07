import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, refreshTokenDto } from './auth.dto';

@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register', operationId: 'registerUser' })
  async register(@Body() user: RegisterDto): Promise<string> {
    return await this.authService.register(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login', operationId: 'loginUser' })
  async login(@Body() user: LoginDto): Promise<string> {
    return await this.authService.login(user);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Token', operationId: 'refreshToken' })
  async refreshToken(@Body() refreshToken: refreshTokenDto): Promise<string> {
    return await this.authService.refreshToken(refreshToken);
  }
}
