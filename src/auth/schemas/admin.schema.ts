// src/auth/schemas/admin.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string; // 🔑 hashed
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
