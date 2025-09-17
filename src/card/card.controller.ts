// src/card/card.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createCard(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any, // 🔥 get form-data fields
  ) {
    const data: CreateCardDto = {
      employeeName: body.employeeName,
      fatherName: body.fatherName,
      designation: body.designation,
      contractor: body.contractor,
      adharCardNumber: body.adharCardNumber,
      dateOfIssue: body.dateOfIssue,
      validTill: body.validTill,
      mobileNumber: body.mobileNumber,
      address: body.address,
    };

    return this.cardService.createCard(data, file);
  }

  @Get(':id')
  async getCard(@Param('id') id: string) {
    return this.cardService.getCard(id);
  }
}
