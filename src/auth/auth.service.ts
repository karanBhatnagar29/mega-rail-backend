// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AuthService {
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
}
