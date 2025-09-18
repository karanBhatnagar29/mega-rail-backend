import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema({ timestamps: true })
export class Card {
  @Prop()
  cardNo: string;

  @Prop({ required: true })
  dateOfIssue: string;

  @Prop({ required: true })
  employeeName: string;

  @Prop({ required: true })
  fatherName: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  contractor: string;

  @Prop({ required: true })
  adharCardNumber: string;

  @Prop({ required: true })
  validTill: string;

  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  photo: string;

  // 🔹 New fields
  @Prop({ required: true })
  divisionName: string;

  @Prop({ required: true })
  loaNumber: string;

  @Prop({ required: true })
  profileName: string;

  // 🔹 New field
  @Prop()
  description: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
