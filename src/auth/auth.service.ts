// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomInt } from 'crypto';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AuthService {
  private otps = new Map<string, string>(); // temporary OTP store

  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const admin = new this.adminModel({ username, password: hashed });
    return admin.save();
  }

  async login(username: string, password: string) {
    const admin = await this.adminModel.findOne({ username }).exec();
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: admin._id, username: admin.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // 🔹 Existing reset password (for logged-in users)
  async resetPassword(
    adminId: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const admin = await this.adminModel.findById(adminId);
    if (!admin) throw new NotFoundException('Admin not found');

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    return { message: 'Password updated successfully' };
  }

  // =====================================================
  // 🔹 New: Send OTP to default Gmail
  // =====================================================
  async sendOtp(email: string) {
    const allowedEmail = 'megarailpowerproject@gmail.com';
    if (email !== allowedEmail) {
      throw new BadRequestException('Unauthorized email');
    }

    const otp = randomInt(100000, 999999).toString();
    this.otps.set(email, otp);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MEGARAIL_EMAIL,
        pass: process.env.MEGARAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Mega Rail Support" <${allowedEmail}>`,
      to: email,
      subject: 'Your Mega Rail Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Your OTP Code</h2>
          <p>Use this 6-digit OTP to reset your password:</p>
          <h1 style="letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    return { message: 'OTP sent successfully' };
  }

  // =====================================================
  // 🔹 New: Verify OTP
  // =====================================================
  async verifyOtp(email: string, otp: string) {
    const validOtp = this.otps.get(email);
    if (!validOtp || validOtp !== otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    return { message: 'OTP verified successfully' };
  }

  // =====================================================
  // 🔹 New: Change password after OTP verification
  // =====================================================
  async resetPasswordWithOtp(
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const allowedEmail = 'megarailpowerproject@gmail.com';

    // ✅ Only check if email matches the allowed one
    if (email !== allowedEmail) {
      throw new BadRequestException('Unauthorized email');
    }

    // ✅ Verify OTP
    const validOtp = this.otps.get(email);
    if (!validOtp || validOtp !== otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // ✅ Validate passwords
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // ✅ Find the only admin (since there's just one)
    const admin = await this.adminModel.findOne();
    if (!admin) {
      throw new NotFoundException('Admin account not found');
    }

    // ✅ Update password securely
    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    await admin.save();

    // ✅ Clear OTP after successful reset
    this.otps.delete(email);

    return { message: 'Password changed successfully' };
  }
}
