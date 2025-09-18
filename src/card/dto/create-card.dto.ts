import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumberString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateCardDto {
  @IsOptional()
  @IsString()
  cardNo?: string;

  @IsDateString()
  dateOfIssue: string;

  @IsString()
  @IsNotEmpty()
  employeeName: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsNotEmpty()
  contractor: string;

  @IsNumberString()
  @Length(12, 12)
  adharCardNumber: string;

  @IsDateString()
  validTill: string;

  @IsNumberString()
  @Length(10, 10)
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  photo?: string; // base64 or URL

  // 🔹 New fields
  @IsString()
  @IsNotEmpty()
  divisionName: string;

  @IsString()
  @IsNotEmpty()
  loaNumber: string;

  @IsString()
  @IsNotEmpty()
  profileName: string;

  // 🔹 New field (description)
  @IsOptional()
  @IsString()
  description?: string;
}
