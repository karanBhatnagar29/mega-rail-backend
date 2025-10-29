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

  // 🔹 Register (only once)
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  // 🔹 Login
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  // 🔹 Reset password for logged-in admin (protected)
  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Req() req: Request,
    @Body() body: { newPassword: string; confirmPassword: string },
  ) {
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

  // ======================================================
  // 🔹 NEW: Forgot password (Send OTP to Gmail)
  // ======================================================
  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    return this.authService.sendOtp(email);
  }

  // 🔹 Verify OTP
  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  // 🔹 Reset password after OTP verification
  @Post('reset-password-otp')
  async resetPasswordWithOtp(
    @Body()
    body: {
      email: string;
      otp: string;
      newPassword: string;
      confirmPassword: string;
    },
  ) {
    return this.authService.resetPasswordWithOtp(
      body.email,
      body.otp,
      body.newPassword,
      body.confirmPassword,
    );
  }
}
