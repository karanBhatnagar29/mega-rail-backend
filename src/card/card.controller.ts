// src/card/card.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
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
    @Body() body: any,
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
      cardNo: body.cardNo,
      photo: body.photo,
      divisionName: body.divisionName,
      loaNumber: body.loaNumber,
      profileName: body.profileName,
      description: body.description,
    };

    return this.cardService.createCard(data, file);
  }

  @Get('view/:id')
  async viewCard(@Param('id') id: string) {
    return this.cardService.getCard(id);
  }

  @Get(':id')
  async getCard(@Param('id') id: string) {
    return this.cardService.getCard(id);
  }

  @Get()
  async getAllCards() {
    return this.cardService.getAllCards();
  }

  // 🔹 New PUT endpoint for editing
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateCard(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const data: Partial<CreateCardDto> = {
      employeeName: body.employeeName,
      fatherName: body.fatherName,
      designation: body.designation,
      contractor: body.contractor,
      adharCardNumber: body.adharCardNumber,
      dateOfIssue: body.dateOfIssue,
      validTill: body.validTill,
      mobileNumber: body.mobileNumber,
      address: body.address,
      cardNo: body.cardNo,
      divisionName: body.divisionName,
      loaNumber: body.loaNumber,
      profileName: body.profileName,
      description: body.description,
    };

    return this.cardService.updateCard(id, data, file);
  }
}
