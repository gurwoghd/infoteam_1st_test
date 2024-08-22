import {
  Controller,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './req/login.dto';
import { SignUpDto } from './req/signUp.dto';
import { TokenDto } from './res/token.dto';
import { REQUEST } from '@nestjs/core';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'login',
  })
  @ApiBody({
    type: LoginDto,
  })
  @UseGuards(AuthGuard('local'))
  @ApiResponse({ status: 201, description: 'login success' })
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'signup',
  })
  @Post('signup')
  async signup(@Query() query: SignUpDto) {
    return this.authService.signup(query);
  }
}
