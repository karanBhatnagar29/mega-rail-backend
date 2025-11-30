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
  hirer: string;

  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  // @IsString()
  // @IsNotEmpty()
  // contractor: string;

  @IsString()
  @IsNotEmpty()
  policeVerification: string;

  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

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
  photo?: string;

  @IsOptional()
  @IsString()
  seal?: string; // 🔹 New

  @IsOptional()
  @IsString()
  sign?: string; // 🔹 New

  @IsString()
  @IsNotEmpty()
  divisionName: string;

  // @IsString()
  // @IsNotEmpty()
  // loaNumber: string;

  @IsString()
  @IsNotEmpty()
  profileName: string;

  @IsOptional()
  @IsString()
  description?: string;
}
