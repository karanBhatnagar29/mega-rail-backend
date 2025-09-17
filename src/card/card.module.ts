import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { AppModule } from 'src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),CloudinaryModule],

  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}
