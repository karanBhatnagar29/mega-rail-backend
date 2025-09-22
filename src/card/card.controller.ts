import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  UploadedFiles,
  UseInterceptors,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Delete } from '@nestjs/common';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'seal', maxCount: 1 },
      { name: 'sign', maxCount: 1 },
    ]),
  )
  async createCard(
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      seal?: Express.Multer.File[];
      sign?: Express.Multer.File[];
    },
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
      divisionName: body.divisionName,
      loaNumber: body.loaNumber,
      profileName: body.profileName,
      description: body.description,
    };

    return this.cardService.createCard(data, files);
  }
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchCards(@Query('q') query: string) {
    return this.cardService.searchCards(query);
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'seal', maxCount: 1 },
      { name: 'sign', maxCount: 1 },
    ]),
  )
  async updateCard(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      seal?: Express.Multer.File[];
      sign?: Express.Multer.File[];
    },
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

    return this.cardService.updateCard(id, data, files);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    return this.cardService.deleteCard(id);
  }
}
