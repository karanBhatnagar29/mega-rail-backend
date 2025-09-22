// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // ⚠️ use only once to create admin
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Req() req: Request,
    @Body() body: { newPassword: string; confirmPassword: string },
  ) {
    // Tell TypeScript that req has a 'user' property
    const user = (req as any).user as { userId: string; username: string };

    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }

    return this.authService.resetPassword(
      user.userId,
      body.newPassword,
      body.confirmPassword,
    );
  }
}
