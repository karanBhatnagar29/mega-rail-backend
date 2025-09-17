// src/card/card.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.provider'; // 👈 import Cloudinary

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private readonly cloudinaryService: CloudinaryService, // 👈 inject Cloudinary
  ) {}

  async createCard(
    data: CreateCardDto,
    file?: Express.Multer.File,
  ): Promise<Card> {
    let photoUrl: string | null = null;

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      photoUrl = uploadResult.secure_url;
    }

    const createdCard = new this.cardModel({
      ...data,
      photo: photoUrl,
    });

    return createdCard.save();
  }

  async getCard(id: string): Promise<Card | null> {
    return this.cardModel.findById(id).exec();
  }
}
