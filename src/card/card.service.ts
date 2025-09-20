import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.provider';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCard(
    data: CreateCardDto,
    files?: {
      photo?: Express.Multer.File[];
      seal?: Express.Multer.File[];
      sign?: Express.Multer.File[];
    },
  ): Promise<Card> {
    let photoUrl: string | null = null;
    let sealUrl: string | null = null;
    let signUrl: string | null = null;

    if (files?.photo?.[0]) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        files.photo[0],
      );
      photoUrl = uploadResult.secure_url;
    }
    if (files?.seal?.[0]) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        files.seal[0],
      );
      sealUrl = uploadResult.secure_url;
    }
    if (files?.sign?.[0]) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        files.sign[0],
      );
      signUrl = uploadResult.secure_url;
    }

    const createdCard = new this.cardModel({
      ...data,
      photo: photoUrl,
      seal: sealUrl,
      sign: signUrl,
    });

    return createdCard.save();
  }

  async getCard(id: string): Promise<Card | null> {
    return this.cardModel.findById(id).exec();
  }

  async getAllCards(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async updateCard(
    id: string,
    data: Partial<CreateCardDto>,
    files?: {
      photo?: Express.Multer.File[];
      seal?: Express.Multer.File[];
      sign?: Express.Multer.File[];
    },
  ): Promise<Card> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    if (files?.photo?.[0]) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        files.photo[0],
      );
      card.photo = uploadResult.secure_url;
    }
    if (files?.seal?.[0]) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        files.seal[0],
      );
      card.seal = uploadResult.secure_url;
    }
    if (files?.sign?.[0]) {
      const uploadResult = await this.cloudinaryService.uploadImage(
        files.sign[0],
      );
      card.sign = uploadResult.secure_url;
    }

    Object.assign(card, data);
    return card.save();
  }
}
