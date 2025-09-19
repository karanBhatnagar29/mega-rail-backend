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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCard(@Param('id') id: string) {
    return this.cardService.getCard(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCards() {
    return this.cardService.getAllCards();
  }

  // 🔹 New PUT endpoint for editing
  @UseGuards(JwtAuthGuard)
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
