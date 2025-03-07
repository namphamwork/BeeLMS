import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { createResponse } from '../util/util';
import { LoginDto, RegisterDto, refreshTokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(user: RegisterDto): Promise<any> {
    try {
      const res = await this.usersService.createUser(user);
      if (res.statusCode == 201) {
        return createResponse(200, 'Registration successfully');
      } else {
        return res;
      }
    } catch (error) {
      return createResponse(500, 'Registration failed', error.message);
    }
  }

  async login(user: LoginDto): Promise<any> {
    try {
      const isValid = await this.usersService.validateUser(user);

      if (isValid) {
        const token = await this.generateToken(isValid);
        return createResponse(200, 'Login success', token);
      } else {
        return createResponse(401, 'Invalid credentials');
      }
    } catch (error) {
      return createResponse(500, 'Login failed', error.message);
    }
  }

  async handleVerifyToken(token: string): Promise<any>{
    try {
      const payload = await this.jwtService.verifyAsync(token,{
        secret: process.env.SECRET_KEY
      });
      
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Auth failed !')
    }
  }

  async refreshToken(refreshToken: refreshTokenDto): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(
        refreshToken.refresh_token,
      );
      const checkExistToken = await this.usersService.verifyUser({
        _id: verify.id,
        role: verify.role,
        refresh_token: refreshToken.refresh_token,
      });
      if (checkExistToken) {
        return this.generateToken({ _id: verify.id, role: verify.role });
      } else {
        return createResponse(500, 'Refresh Token is not vaid');
      }
    } catch (error) {
      return createResponse(500, 'Refresh Token is not vaid');
    }
  }

  private async generateToken(user: {
    _id: string;
    role: string;
  }): Promise<any> {
    const payload = { id: user._id, role: user.role };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    const userUpdate: any = {
      refresh_token,
    };

    await this.usersService.updateUser(user._id, userUpdate);
    return { access_token, refresh_token };
  }
}
